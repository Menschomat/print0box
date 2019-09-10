import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BoxService {
  constructor(private http: HttpClient) {}
  public getConfig() {
    return this.http.get(`/api/config`);
  }
  public changeFanState(boxId: string, fanId: string, state: string) {
    return this.http.get(`/api/${boxId}/fan/${fanId}?state=${state}`);
  }
  public changeEnclosureLightState(state: string) {
    return this.http.get(`/api/light?state=${state}`);
  }
}
