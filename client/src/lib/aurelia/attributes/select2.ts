declare const $;

import "../../bundles/select2";
import {autoinject, bindable, bindingMode, customAttribute} from "aurelia-framework";

@customAttribute('select2')
@autoinject()
export class Select2 {

  @bindable({defaultBindingMode: bindingMode.oneWay})
  selected: any;

  constructor(private element: Element) {
    this.element = element;
  }

  selectedChanged(newValue, oldValue) {
    $(this.element).select2({val: this.selected});
  }

  attached() {

    const el = $(this.element);
    const sel = el.select2();

    // Convert boolean values to strings.
    if (typeof this.selected == 'boolean') {
      this.selected = this.selected.toString();
    }

    sel.on('change', event => {
      if (event.originalEvent) {
        return;
      }
      this.element.dispatchEvent(new Event('change', {bubbles: true}));
    });

  }

  detached() {
    $(this.element).select2('destroy');
  }
}
