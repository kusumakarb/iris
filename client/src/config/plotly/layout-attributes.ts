import {Constants} from "../constants";

/**
 * @link https://plot.ly/javascript/reference/#layout
 * @link https://github.com/plotly/plotly.js/blob/master/src/plots/layout_attributes.js
 * @type {{font: {family: string; size: number; color: string}; title: string; titlefont: {family: string; size: number; color: string}; autosize: boolean; width: number; height: number; margin: {l: number; r: number; t: number; b: number; pad: number; autoexpand: boolean}; paper_bgcolor: string; plot_bgcolor: string; separators: string; hidesources: boolean; smith: boolean; showlegend: boolean}}
 */
const LayoutAttributes = {
  font: {
    family: Constants.FONT_FAMILY,
    size: 12,
    color: Constants.COLOR_GRAPH_PRIMARY
  },
  title: 'Click to enter Plot title',
  titlefont: {
    family: Constants.FONT_FAMILY,
    size: 12,
    color: Constants.COLOR_GRAPH_PRIMARY
  },
  autosize: false,
  width: 700,
  height: 450,
  margin: {
    l: 80, r: 80, t: 100, b: 80, pad: 0, autoexpand: true
  },
  paper_bgcolor: Constants.BG_GRAPH_PRIMARY,
  plot_bgcolor: Constants.BG_GRAPH_PRIMARY,
  separators: '.,',
  hidesources: false,
  smith: false,
  showlegend: true,
}

export {LayoutAttributes};
