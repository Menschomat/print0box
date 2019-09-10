import { Component, OnInit, Input } from "@angular/core";
import { BoxService } from "src/app/services/box.service";

@Component({
  selector: "app-box-settings-card",
  templateUrl: "./box-settings-card.component.html",
  styleUrls: ["./box-settings-card.component.scss"]
})
export class BoxSettingsCardComponent implements OnInit {
@Input()
box:any;

  constructor(private boxService:BoxService) {}

  ngOnInit() {

  }
  onChange(event, fan){
    if(event.checked){
      this.boxService.changeFanState(this.box.id,fan.id,"on").subscribe();
      fan.state ="on";
    }else{
      this.boxService.changeFanState(this.box.id,fan.id,"off").subscribe();
      fan.state = "off";
    }
  }
}
