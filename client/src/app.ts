declare const Mousetrap;

import {Router, RouterConfiguration} from "aurelia-router";
import {PLATFORM} from "aurelia-pal";
import {Routes} from "./config/enums";

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {

    config.title = 'Iris';

    config.map([
      {route: ['', 'home'], name: Routes.Home, moduleId: PLATFORM.moduleName('./vvm/pages/home/home')},
      {route: 'test', name: Routes.Test, moduleId: PLATFORM.moduleName('./vvm/pages/test/test')},
      {route: Routes.Login, name: Routes.Login, moduleId: PLATFORM.moduleName('./vvm/pages/login/login')},
      {
        route: Routes.AddDataSource,
        name: Routes.AddDataSource,
        moduleId: PLATFORM.moduleName('./vvm/pages/add-data-source/add-data-source')
      },
      {
        route: 'workspace/:view?',
        name: Routes.Workspace,
        moduleId: PLATFORM.moduleName('./vvm/pages/workspace/workspace')
      },
    ]);

    // Unknown route
    // config.mapUnknownRoutes('not-found');

    this.router = router;

    this.setupKeys();
  }

  setupKeys() {
    Mousetrap.bind('a s', ()=> this.router.navigateToRoute(Routes.AddDataSource));
  }
}
