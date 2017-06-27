import {PLATFORM} from "aurelia-pal";

export function configure(aurelia) {
  aurelia.globalResources(
    /* Custom Attributes */
    PLATFORM.moduleName('../lib/aurelia/attributes/select2'),
    PLATFORM.moduleName('../lib/aurelia/attributes/tooltip'),
    PLATFORM.moduleName('../lib/aurelia/attributes/ui-jq'),
    /* Converters */
    PLATFORM.moduleName('../lib/aurelia/converters/json'),
    PLATFORM.moduleName('../lib/aurelia/converters/number-format'),
    PLATFORM.moduleName('../lib/aurelia/converters/object-iterator'),
  );
}
