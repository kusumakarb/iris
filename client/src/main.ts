import "vendor";
import {Aurelia} from "aurelia-framework";
import {PLATFORM} from "aurelia-pal";
import {aureliaDialog} from "./config/app-config";

declare const __DEBUG__;

/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>

export async function configure(aurelia: Aurelia) {

  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index')) // install application resources such as value-converters and custom html attributes.
    .plugin(PLATFORM.moduleName('aurelia-api'), config => {
      // Registering hosts
      config.registerEndpoint('api', '/');
    }).plugin(PLATFORM.moduleName('aurelia-dialog'), config => aureliaDialog(config));

  if (__DEBUG__) {
    aurelia.use.developmentLogging();
  }

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'));
}
