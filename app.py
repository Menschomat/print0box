from flask import Flask, request
import RPi.GPIO as GPIO
import json

app = Flask(__name__)
GPIO.setmode(GPIO.BCM)  # GPIO Nummern statt Board Nummern

with open('config.json') as config_file:
    config = json.load(config_file)
    GPIO.setup(config['light']['gpio'], GPIO.OUT)
    GPIO.output(config['light']['gpio'], GPIO.HIGH)
    config['light']['state'] = "off"
    for box in config['boxes']:
        for fan in box['fans']:
            GPIO.setup(fan['gpio'], GPIO.OUT)
            GPIO.output(fan['gpio'], GPIO.HIGH)
            fan['state'] = "off"


@app.route('/api/config')
def get_config():
    return config


@app.route("/api/light")
def set_enclosure_light():
    state = request.args.get('state')
    if state == 'on':
        GPIO.output(config['light']['gpio'], GPIO.LOW)
        config['light']['state'] = "on"
    elif state == 'off':
        GPIO.output(config['light']['gpio'], GPIO.HIGH)
        config['light']['state'] = "off"
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


@app.route("/api/<box_id>/fan/<fan_id>")
def set_fan_state(box_id, fan_id):
    states = ['on', 'off']
    state = request.args.get('state')
    box = next((x for x in config['boxes'] if x['id'] == box_id), None)
    if box is not None and state in states:
        fan = next((x for x in box['fans'] if x['id'] == fan_id), None)
        if fan is not None:
            if state == 'on':
                GPIO.output(fan['gpio'], GPIO.LOW)
                fan['state'] = "on"
            else:
                GPIO.output(fan['gpio'], GPIO.HIGH)
                fan['state'] = "off"
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    return json.dumps({'success':False}), 400, {'ContentType':'application/json'}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
