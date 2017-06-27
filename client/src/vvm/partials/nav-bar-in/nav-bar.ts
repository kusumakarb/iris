import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {Routes} from "../../../config/enums";

@autoinject()
export class NavBar {

  router: Router;

  routes = Routes;

  constructor(router: Router) {
    this.router = router;
  }

}
