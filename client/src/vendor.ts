declare const __VERSION__;
console.log('Version: ' + __VERSION__);

import "./styles/styles";
import * as Bluebird from "bluebird";
import "jquery";
import "mousetrap";
import "./lib/bundles/bootstrap";
import "./lib/bundles/dotdotdot";

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({warnings: {wForgottenReturn: false}});
