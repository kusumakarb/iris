declare const $;

import {autoinject, customAttribute} from "aurelia-framework";

@customAttribute('tooltip')
@autoinject()
export class Tooltip {

  constructor(private element: Element) {
    this.element = element;
  }

  attached() {
    $(this.element).tooltip();
  }

  detached() {
    $(this.element).tooltip('dispose');
  }
}
