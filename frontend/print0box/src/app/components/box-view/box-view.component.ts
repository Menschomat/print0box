import { Component, OnInit } from "@angular/core";
import { BoxService } from "src/app/services/box.service";

@Component({
  selector: "app-box-view",
  templateUrl: "./box-view.component.html",
  styleUrls: ["./box-view.component.scss"]
})
export class BoxViewComponent implements OnInit {
  public boxConfig: any;

  constructor(private boxService: BoxService) {}

  ngOnInit() {
    this.boxService.getConfig().subscribe(res => {
      this.boxConfig = res;
      console.log(this.boxConfig);

    });
  }
  onChange(event){
    if(event.checked){
      this.boxService.changeEnclosureLightState("on").subscribe();
      this.boxConfig.light.state ="on";
    }else{
      this.boxService.changeEnclosureLightState("off").subscribe();
      this.boxConfig.light.state = "off";
    }
  }
}
