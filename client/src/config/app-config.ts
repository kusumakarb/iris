export function aureliaDialog(config) {
  config.useDefaults();
  config.settings.centerHorizontalOnly = true;
  config.settings.lock = false;
  config.settings.startingZIndex = 1001;
  config.settings.ignoreTransitions = true;
  /* https://github.com/aurelia/dialog/issues/237 */
}
