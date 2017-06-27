declare const $;

import "bootstrap";

// To prevent `Tooltip is transitioning` error.
// https://github.com/twbs/bootstrap/issues/21607
$.fn.tooltip.Constructor.Default.animation = false;
