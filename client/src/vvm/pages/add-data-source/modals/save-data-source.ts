import {autoinject} from "aurelia-framework";
import {DialogController} from "aurelia-dialog";

@autoinject()
export class SaveDataSource {

  controller: DialogController;

  constructor(controller: DialogController) {
    this.controller = controller;
  }

  activate(model) {

  }

}
