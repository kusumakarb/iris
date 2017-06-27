declare const $;

import "quill";
import "../../../lib/bundles/spectrum";
import {Constants} from "../../../config/constants";

export class Test {

  attached() {
    this.colorpicker();
    this.handsontable();
  }

  handsontable() {

  }

  colorpicker() {
    $('#colorpicker').spectrum({
      color: "#f00",
      showPaletteOnly: true,
      togglePaletteOnly: true,
      togglePaletteMoreText: 'more',
      togglePaletteLessText: 'less',
      showInput: true,
      allowEmpty: true,
      showAlpha: true,
      showPalette: true,
      // showInitial: true,
      palette: [
        Constants.COLORS_GRAPH_PRIMARY
      ]
    });
  }

}
