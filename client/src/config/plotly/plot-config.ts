/**
 * @link https://plot.ly/javascript/configuration-options/
 * @link https://github.com/plotly/plotly.js/blob/master/src/plot_api/plot_config.js
 * @type {{modeBarButtonsToRemove: string[]; displaylogo: boolean; displayModeBar: boolean}}
 */

const PlotConfig = {
  scrollZoom: true,
  displayModeBar: true,
  modeBarButtonsToRemove: ['sendDataToCloud'],
  displaylogo: false,
  modeBarButtons: {
    zoom2d: {
      title: 'Zoom',
    }
  },
  // Mapbox access token (required to plot mapbox trace types)
  // If using an Mapbox Atlas server, set this option to '',
  // so that plotly.js won't attempt to authenticate to the public Mapbox server.
  mapboxAccessToken: null,
};

export {PlotConfig};
