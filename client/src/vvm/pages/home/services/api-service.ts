declare const $;

import {inject} from "aurelia-framework";
import {Endpoint, Rest} from "aurelia-api";

@inject(Endpoint.of('api'))
export class ApiService {

  apiEndPoint: Rest;

  constructor(apiEndpoint) {
    this.apiEndPoint = apiEndpoint;
  }

  getIrisData(): Promise<any> {
    return this.apiEndPoint.find('');
  }


}
