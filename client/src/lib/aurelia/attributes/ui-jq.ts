declare const $;

import {autoinject, customAttribute} from "aurelia-framework";

@customAttribute('ui-jq')
@autoinject()
export class UiJq {

  value: string;

  constructor(private element: Element) {
    this.element = element;
  }

  attached() {
    if (!$.fn[this.value]) {
      throw new Error('ui-jq: The "' + this.value + '" function does not exist');
    }
    $(this.element)[this.value]();
  }
}
