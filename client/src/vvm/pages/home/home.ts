import {Constants} from "../../../config/constants";
import {Config} from "aurelia-api";
import {autoinject} from "aurelia-framework";
import {transformedData, imbdData} from "./interfaces/interfaces";
import {DataConverters} from "./data-converters/data-converters";
declare const $;

const Plotly = require('../../../lib/bundles/plotly');

import {LayoutAttributes} from "../../../config/plotly/layout-attributes";
import {PlotConfig} from "../../../config/plotly/plot-config";

const irisData = require('../../../../static/data/iris.json');
const mapData = require('../../../../static/data/map-data.json');
const imdbData: imbdData[] = require('../../../../static/data/imdb_data.json').sort((a, b) => parseInt(a.title_year) - parseInt(b.title_year));

@autoinject()
export class Home {

  chartContainer: Element;
  leftColumn: Element;

  apiEndpoint: any;
  dataConverters: DataConverters;
  transformedData: transformedData;

  layoutOptions = LayoutAttributes;


  constructor(config: Config, dataConverters: DataConverters) {
    this.apiEndpoint = config.getEndpoint('api');
    this.dataConverters = dataConverters;

  }


  attached() {
    this.transformedData = this.dataConverters.lineChartDataGenerator(irisData);
    this.drawLinechart();
  }


  drawLinechart() {

    const petalWidthTrace = {
      x: this.transformedData.petalLengthArray.sort((a, b) => a - b),
      y: this.transformedData.petalWidthArray,
      type: 'scatter',
      mode: 'lines',
      name: 'Petal width',
      line: {
        color: Constants.COLOR_PRIMARY,
        width: 1
      }
    };

    const sepalWidthTrace = {
      x: this.transformedData.petalLengthArray.sort((a, b) => a - b),
      y: this.transformedData.sepalWidthArray,
      type: 'scatter',
      mode: 'lines',
      name: 'Septal width',
      line: {
        color: Constants.COLOR_PRIMARY,
        width: 1
      }
    };


    const data = [petalWidthTrace, sepalWidthTrace];

    Plotly.newPlot(this.chartContainer, data, this.layoutOptions, PlotConfig);

  }


  drawBubbleChart() {
    const trace1 = {
      x: this.transformedData.petalLengthArray.sort((a, b) => a - b),
      y: this.transformedData.petalWidthArray,
      mode: 'markers',
      marker: {}
    };

    const data = [trace1];

    /*const layout = {
     title: 'Marker Size',
     showlegend: false,
     height: 600,
     width: 600
     };*/

    Plotly.newPlot(this.chartContainer, data, this.layoutOptions);

  }


  drawDotPlots() {

    const trace1 = {
      type: 'scatter',
      x: this.transformedData.petalLengthArray.sort((a, b) => a - b),
      y: this.transformedData.sepalLengthArray,
      mode: 'markers',
      name: 'Septal length',
      marker: {
        color: Constants.COLOR_PRIMARY,
        line: {
          color: 'rgba(156, 165, 196, 1.0)',
          width: 1,
        },
        symbol: 'circle',
        size: 16
      }
    };


    const trace2 = {
      x: this.transformedData.petalLengthArray.sort((a, b) => a - b),
      y: this.transformedData.petalWidthArray,
      mode: 'markers',
      name: 'Petal Width',
      marker: {
        color: 'rgba(204, 204, 204, 0.95)',
        line: {
          color: 'rgba(217, 217, 217, 1.0)',
          width: 1,
        },
        symbol: 'circle',
        size: 16
      }
    };

    const data = [trace1, trace2];

    Plotly.newPlot(this.chartContainer, data, this.layoutOptions);

  }


  drawFilledAreaPlots() {

    const trace1 = {
      x: this.transformedData.petalLengthArray.sort((a, b) => a - b),
      y: this.transformedData.sepalLengthArray,
      fill: 'tozeroy',
      type: 'scatter',
      name: 'Septal length',
    };

    const trace2 = {
      x: this.transformedData.petalLengthArray.sort((a, b) => a - b),
      y: this.transformedData.sepalWidthArray,
      name: 'Septal width',
      fill: 'tonexty',
      type: 'scatter'
    };

    const data = [trace1, trace2];

    Plotly.newPlot(this.chartContainer, data, this.layoutOptions);
  }


  drawBarChart() {

    const trace1 = {
      x: this.transformedData.sepalLengthArray.sort((a, b) => a - b),
      y: this.transformedData.petalWidthArray,
      name: 'Petal width',
      type: 'bar'
    };

    const trace2 = {
      x: this.transformedData.sepalLengthArray.sort((a, b) => a - b),
      y: this.transformedData.sepalWidthArray,
      name: 'Sepal width',
      type: 'bar'
    };

    const data = [trace1, trace2];

    const layout = {barmode: 'group'};

    Plotly.newPlot(this.chartContainer, data, this.layoutOptions);

  }


  drawHorizontalBarChart() {

    const data = [{
      type: 'bar',
      x: this.transformedData.sepalLengthArray.sort((a, b) => a - b),
      y: this.transformedData.petalLengthArray,
      orientation: 'h'
    }];

    Plotly.newPlot(this.chartContainer, data, this.layoutOptions);

  }


  drawPieChart() {
    const data = [{
      values: [
        this.transformedData.petalWidthArray.reduce((acc, currentEle) => acc + currentEle),
        this.transformedData.petalLengthArray.reduce((acc, currentEle) => acc + currentEle),
        this.transformedData.sepalWidthArray.reduce((acc, currentEle) => acc + currentEle),
        this.transformedData.sepalLengthArray.reduce((acc, currentEle) => acc + currentEle)
      ],
      labels: ['Petal width', 'Petal length', 'Sepal width', 'Sepal length'],
      type: 'pie'
    }];
    Plotly.newPlot(this.chartContainer, data);
  }


  drawGuageChart() {
    //TODO - is this suited for the data?
  }


  drawSankeyChart() {

    const dataConf = {
      type: "sankey",
      domain: {
        x: [0, 1],
        y: [0, 1]
      },
      orientation: "h",
      valueformat: ".0f",
      valuesuffix: "TWh",
      node: {
        pad: 15,
        thickness: 15,
        line: {
          color: "cyan",
          width: 0.5
        },
        label: [
          "Agricultural 'waste'",
          "Bio-conversion",
          "Liquid",
          "Losses",
          "Solid"
        ],
        color: []
      },
      link: {
        source: [1, 2, 3, 4, 5, 6],
        target: [6, 4, 2, 1, 4, 5],
        value: [
          124.729,
          0.597,
          26.862,
          280.322,
          81.144],
        color: [
          "rgba(31, 119, 180, 0.8)",
          "rgba(255, 127, 14, 0.8)",
          "rgba(44, 160, 44, 0.8)",
          "rgba(214, 39, 40, 0.8)",
          "rgba(214, 39, 40, 0.8)"
        ],
        label: [
          "Agricultural 'waste'",
          "Bio-conversion",
          "Liquid",
          "Losses",
          "Solid"]
      }
    };

    const data = [dataConf];

    const layout = {
      title: "Energy forecast for 2050, UK — Department of Energy & Climate Change",
      width: 1118,
      height: 772,
      font: {
        size: 10,
        color: Constants.COLOR_PRIMARY
      },
      plot_bgcolor: 'blue',
      paper_bgcolor: 'white'
    };

    Plotly.plot(this.chartContainer, data, layout)
  }


  drawErrorChart() {
    const data = [
      {
        x: this.transformedData.sepalLengthArray.sort((a, b) => a - b),
        y: this.transformedData.petalLengthArray,
        error_y: {
          type: 'data',
          array: this.transformedData.sepalWidthArray,
          visible: true
        },
        type: 'scatter'
      }
    ];
    Plotly.newPlot(this.chartContainer, data, this.layoutOptions);
  }


  drawCandleChart() {

    const trace1 = {

      x: this.transformedData.petalLengthArray,

      close: this.transformedData.sepalLengthArray,

      decreasing: {line: {color: '#7F7F7F'}},

      high: this.transformedData.sepalLengthArray,

      increasing: {line: {color: '#17BECF'}},

      line: {color: 'rgba(31,119,180,1)'},

      low: this.transformedData.petalLengthArray,

      open: this.transformedData.petalLengthArray,

      type: 'candlestick',
      xaxis: 'Petal length',
      yaxis: 'Sepal Length'
    };

    const data = [trace1];

    const layout = {
      dragmode: 'zoom',
      margin: {
        r: 10,
        t: 10,
        b: 50,
        l: 100
      },
      showlegend: false,
      xaxis: {
        autorange: true,
        title: 'Sepal length',
        type: 'linear'
      },
      yaxis: {
        autorange: true,
        title: 'Petal length',
        type: 'string'
      }
    };


    Plotly.newPlot(this.chartContainer, data, layout);

  }


  draw3dScatterPlot() {


    const trace1 = {
      x: this.transformedData.petalLengthArray,
      y: this.transformedData.petalWidthArray,
      z: this.transformedData.sepalWidthArray,
      mode: 'markers',
      marker: {
        size: 12,
        line: {
          color: Constants.COLOR_PRIMARY,
          width: 0.5
        },
        opacity: 0.8
      },
      type: 'scatter3d',
      name: 'Petal length'
    };

    const trace2 = {
      x: this.transformedData.sepalLengthArray,
      y: this.transformedData.sepalWidthArray,
      z: this.transformedData.petalLengthArray,
      mode: 'markers',
      marker: {
        color: 'rgb(127, 127, 127)',
        size: 12,
        symbol: 'circle',
        line: {
          color: 'rgb(204, 204, 204)',
          width: 1
        },
        opacity: 0.8
      },
      type: 'scatter3d',
      name: 'Sepal length'
    };

    const data = [trace1, trace2];

    Plotly.newPlot(this.chartContainer, data, this.layoutOptions);

  }


  drawRibbonChart() {

    Plotly.d3.json('https://raw.githubusercontent.com/plotly/datasets/master/3d-ribbon.json', (figure) => {

      const trace1 = {
        x: figure.data[0].x, y: figure.data[0].y, z: figure.data[0].z,
        name: '',
        colorscale: figure.data[0].colorscale,
        showscale: false
      };

      const trace2 = {
        x: figure.data[1].x, y: figure.data[1].y, z: figure.data[1].z,
        name: '',
        type: 'surface',
        colorscale: figure.data[1].colorscale,
        showscale: false
      };

      const layout = {
        title: 'Ribbon Plot',
        showlegend: false,
        scene: {
          xaxis: {title: 'Petal length'},
          yaxis: {title: 'Sepal length'},
          zaxis: {title: 'Petal width'}
        }
      };

      const data = [trace1, trace2];

      Plotly.newPlot(this.chartContainer, data, layout);
    });

  }


  draw3dSurfacePlot() {
    const layout = {
      title: '3d surface plot',
      scene: {
        xaxis: {title: 'Petal length'},
        yaxis: {title: 'Sepal length'},
        zaxis: {title: 'Petal width'}
      },
      showlegend: true,
      autosize: false,
      width: 940,
      height: 400,
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 0
      }
    };

    const data = [{
      z: [
        this.transformedData.sepalWidthArray,
        this.transformedData.sepalLengthArray,
        this.transformedData.petalWidthArray,
        this.transformedData.petalLengthArray,
      ],
      type: 'surface'
    }];
    Plotly.newPlot(this.chartContainer, data, layout);

  }


  draw3dMesh() {

    const data = [
      {
        opacity: 0.8,
        color: Constants.COLOR_PRIMARY,
        type: 'mesh3d',
        x: this.transformedData.petalLengthArray,
        y: this.transformedData.sepalLengthArray,
        z: this.transformedData.petalWidthArray,
      }
    ];

    const layout = {
      title: '3d Mesh Plot',
      showlegend: true,
      scene: {
        xaxis: {title: 'Petal length'},
        yaxis: {title: 'Sepal length'},
        zaxis: {title: 'Petal width'}
      },
      autosize: false,
      width: 940,
      height: 400,
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 0
      }
    };

    Plotly.newPlot(this.chartContainer, data, layout);

  }


  draw3dClusterGraph() {


    const data = [{
      x: this.transformedData.petalLengthArray,
      y: this.transformedData.sepalLengthArray,
      z: this.transformedData.petalWidthArray,
      mode: 'markers',
      type: 'scatter3d',
      marker: {
        color: Constants.COLOR_PRIMARY,
        size: 2
      }
    }, {
      alphahull: 7,
      opacity: 0.1,
      type: 'mesh3d',
      x: this.transformedData.petalLengthArray,
      y: this.transformedData.sepalLengthArray,
      z: this.transformedData.petalWidthArray,
    }];


    const layout = {
      showlegend: true,
      autosize: false,
      width: 940,
      height: 400,
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 0
      },
      scene: {
        aspectratio: {
          x: 1,
          y: 1,
          z: 1
        },
        camera: {
          center: {
            x: 0,
            y: 0,
            z: 0
          },
          eye: {
            x: 1.25,
            y: 1.25,
            z: 1.25
          },
          up: {
            x: 0,
            y: 0,
            z: 1
          }
        },
        xaxis: {
          type: 'linear',
          zeroline: false,
          title: 'Petal length'
        },
        yaxis: {
          type: 'linear',
          zeroline: false,
          title: 'Sepal length'
        },
        zaxis: {
          type: 'linear',
          zeroline: false,
          title: 'Petal width'
        }
      },
      title: '3d point clustering'
    };

    Plotly.newPlot(this.chartContainer, data, layout);

  }


  draw3dLinePlot() {

    const trace1 = {
      x: this.transformedData.petalLengthArray,
      y: this.transformedData.sepalLengthArray,
      z: this.transformedData.petalWidthArray,
      mode: 'lines',
      marker: {
        color: '#1f77b4',
        size: 12,
        symbol: 'circle',
        line: {
          color: 'rgb(0,0,0)',
          width: 0
        }
      },
      line: {
        color: '#1f77b4',
        width: 1
      },
      type: 'scatter3d'
    };

    const trace2 = {
      x: this.transformedData.sepalLengthArray,
      y: this.transformedData.petalWidthArray,
      z: this.transformedData.sepalWidthArray,
      mode: 'lines',
      marker: {
        color: '#9467bd',
        size: 12,
        symbol: 'circle',
        line: {
          color: 'rgb(0,0,0)',
          width: 0
        }
      },
      line: {
        color: 'rgb(44, 160, 44)',
        width: 1
      },
      type: 'scatter3d'
    };

    const data = [trace1, trace2];

    Plotly.newPlot(this.chartContainer, data, this.layoutOptions);


  }


  drawCarpetScatterPlot() {

    const trace1 = {
      type: 'carpet',
      a: this.transformedData.sepalWidthArray,
      b: this.transformedData.petalWidthArray,
      y: this.transformedData.petalLengthArray,
      aaxis: {
        tickprefix: 's = ',
        ticksuffix: 'Sepal',
        smoothing: 1,
        minorgridcount: 9,
      },
      baxis: {
        tickprefix: 'p = ',
        ticksuffix: 'Petal',
        smoothing: 1,
        minorgridcount: 9,
      }
    };

    const data = [trace1];

    Plotly.newPlot(this.chartContainer, data);


  }


  drawHeatMap() {

    const data = [
      {
        z: [this.transformedData.petalLengthArray, this.transformedData.sepalLengthArray, this.transformedData.petalWidthArray],
        type: 'heatmap'
      }
    ];

    Plotly.newPlot(this.chartContainer, data);


  }


  drawHistogram() {

    const data = [
      {
        x: this.transformedData.sepalWidthArray,
        type: 'histogram',
        marker: {
          color: Constants.COLOR_PRIMARY,
        },
      }
    ];

    const layout = {
      bargap: 0.05,
      bargroupgap: 0.2,
      showlegend: true,
      autosize: true,
      margin: {
        l: 100,
        r: 10,
        b: 50,
        t: 10,
        pad: 10
      },
      xaxis: {
        title: 'Petal length'
      },
      yaxis: {
        title: 'Petal width'
      }
    };
    Plotly.newPlot(this.chartContainer, data, layout);

  }


  drawOlhcChart() {

    const trace1 = {

      x: this.transformedData.petalLengthArray,

      close: this.transformedData.sepalLengthArray,

      decreasing: {line: {color: '#7F7F7F'}},

      high: this.transformedData.sepalLengthArray,

      increasing: {line: {color: '#17BECF'}},

      line: {color: 'rgba(31,119,180,1)'},

      low: this.transformedData.petalLengthArray,

      open: this.transformedData.petalLengthArray,

      type: 'ohlc',
      xaxis: 'Petal length',
      yaxis: 'Sepal Length'
    };

    const data = [trace1];


    Plotly.newPlot(this.chartContainer, data, this.layoutOptions);


  }


  drawParallelCoordinatesPlot() {

    const trace = {
      type: 'parcoords',
      line: {
        color: Constants.COLOR_PRIMARY
      },

      dimensions: [{
        range: [this.transformedData.sepalLengthArray[0], this.transformedData.sepalLengthArray[this.transformedData.sepalLengthArray.length - 1]],
        constraintrange: [1, 2],
        label: 'Sepal Length',
        values: this.transformedData.sepalLengthArray
      }, {
        range: [this.transformedData.sepalWidthArray[0], this.transformedData.sepalWidthArray[this.transformedData.sepalWidthArray.length - 1]],
        label: 'Sepal Width',
        values: this.transformedData.sepalWidthArray
      }, {
        range: [this.transformedData.petalLengthArray[0], this.transformedData.petalLengthArray[this.transformedData.petalLengthArray.length - 1]],
        label: 'Petal Length',
        values: this.transformedData.petalLengthArray
      }]
    };

    const data = [trace];
    Plotly.newPlot(this.chartContainer, data);

  }


  drawMapPlot() {

    Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/c34aaa0b1b3cddad335173cb7bc0181897201ee6/2011_february_aa_flight_paths.csv', (err, rows) => {
      function unpack(rows, key) {
        return rows.map(function (row) {
          return row[key];
        });
      }

      function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
      }

      const data = [];
      const count = unpack(rows, 'cnt');
      const startLongitude = unpack(rows, 'start_lon');
      const endLongitude = unpack(rows, 'end_lon');
      const startLat = unpack(rows, 'start_lat');
      const endLat = unpack(rows, 'end_lat');

      for (let i = 0; i < count.length; i++) {
        const opacityValue = count[i] / getMaxOfArray(count);

        const result = {
          type: 'scattergeo',
          locationmode: 'USA-states',
          lon: [startLongitude[i], endLongitude[i]],
          lat: [startLat[i], endLat[i]],
          mode: 'lines',
          line: {
            width: 1,
            color: 'red'
          },
          opacity: opacityValue
        };

        data.push(result);
      }
      ;

      const layout = {
        title: 'Feb. 2011 American Airline flight paths',
        showlegend: true,
        autosize: false,
        width: 940,
        height: 400,
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0,
          pad: 0
        },
        geo: {
          scope: 'india',
          projection: {
            type: 'azimuthal equal area'
          },
          showland: true,
          landcolor: 'rgb(243,243,243)',
          countrycolor: 'rgb(204,204,204)'
        }
      };

      Plotly.newPlot(this.chartContainer, data, layout, {showLink: false});

    });

  }


  drawChoroplethMap() {

    Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_usa_states.csv', (err, rows) => {
      function unpack(rows, key) {
        return rows.map(function (row) {
          return row[key];
        });
      }

      const data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unpack(rows, 'postal'),
        z: unpack(rows, 'pop'),
        text: unpack(rows, 'state'),
        autocolorscale: true,

      }];


      const layout = {
        title: '2014 US Popultaion by State',
        showlegend: true,
        autosize: true,
        width: 940,
        height: 400,
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0,
          pad: 0
        },
        geo: {
          scope: 'usa',
          countrycolor: Constants.COLOR_PRIMARY,
          showland: true,
          landcolor: Constants.COLOR_PRIMARY,
          showlakes: true,
          lakecolor: Constants.COLOR_PRIMARY,
          subunitcolor: Constants.COLOR_PRIMARY,
          lonaxis: {},
          lataxis: {}
        }
      };
      Plotly.newPlot(this.chartContainer, data, layout, {showLink: false});
    });

  }


  drawMap() {

    const trace1 = {
      lat: mapData.lat,
      lon: mapData.lon,
      text: mapData.text,
      "mode": "markers",
      "hoverinfo": "text",
      "marker": {
        size: 14,
        color: Constants.COLOR_PRIMARY,
        opacity: 0.6
      },
      "type": "scattermapbox"
    };

    const layout = {
      "autosize": true,
      "title": "Nuclear Waste Sites on Campus",
      "showlegend": false,
      "hovermode": "closest",
      "mapbox": {
        "bearing": 0,
        "style": "light",
        "center": {
          "lat": 38,
          "lon": -94
        },
        "accesstoken": "pk.eyJ1IjoiY2hlbHNlYXBsb3RseSIsImEiOiJjaXFqeXVzdDkwMHFrZnRtOGtlMGtwcGs4In0.SLidkdBMEap9POJGIe1eGw",
        "zoom": 3,
        "pitch": 0
      }
    };


    const data = [trace1];

    Plotly.newPlot(this.chartContainer, data, layout);

  }


  /*Line graph using IMDB*/

  drawNumberOfMoviesIMDB() {
    const grouped = this.dataConverters.groupBy(imdbData, data => data.title_year);

    const trace1 = {
      x: Array.from(grouped.keys()),
      y: Array.from(grouped.values()).map((groupedElement) => groupedElement.length),
      mode: 'lines',
      connectgaps: true
    };

    const data = [trace1];

    const layout = {
      showlegend: false,
      autosize: true,
      title: 'Year and movies',
      yaxis: {
        title: 'Number of movies a year'
      },
      xaxis: {
        title: 'Title year'
      },
      width: 980,
      height: 500
    };

    Plotly.newPlot(this.chartContainer, data, layout);

  }


  drawAverageScoreIMDB() {

    const grouped = this.dataConverters.groupBy(imdbData, data => data.title_year);

    const trace1 = {
      x: Array.from(grouped.keys()),
      y: Array.from(grouped.values()).map((groupedElement) => groupedElement.reduce((acc, currentElement) => {
        return acc + currentElement.imdb_score
      }, 0) / groupedElement.length),
      mode: 'lines',
      connectgaps: true
    };

    const data = [trace1];

    const layout = {
      showlegend: false,
      autosize: true,
      title: 'Year and score',
      xaxis: {
        title: 'Title year'
      },
      yaxis: {
        title: 'IMDB score'
      },
      width: 980,
      height: 500
    };


    Plotly.newPlot(this.chartContainer, data, layout);

  }


  darwContentRatingIMDB() {
    const grouped = this.dataConverters.groupBy(imdbData, data => data.content_rating);
    const data = [
      {
        x: Array.from(grouped.keys()),
        y: Array.from(grouped.values()).map((groupedElement) => groupedElement.reduce((acc, currentElement) => {
          return acc + currentElement.imdb_score
        }, 0) / groupedElement.length),
        type: 'bar',
        marker: {
          color: Constants.COLOR_PRIMARY,
        }
      }
    ];

    const layout = {
      showlegend: false,
      autosize: false,
      margin: {
        l: 100,
        r: 10,
        b: 100,
        t: 100,
        pad: 10
      },
      width: 980,
      height: 500,
      title: 'Score and content rating',
      xaxis: {
        title: 'Content Rating'
      },
      yaxis: {
        title: 'IMDB Score'
      }
    };
    Plotly.newPlot(this.chartContainer, data, layout);

  }


  drawContentRatingBoxIMDB() {
    const grouped = this.dataConverters.groupBy(imdbData, data => data.content_rating);

    const data = Array.from(grouped.values()).map((groupedArray, index) => {
      return {
        x: groupedArray.map((groupedObject) => groupedObject.imdb_score),
        type: 'box',
        name: Array.from(grouped.keys())[index]
      }
    });

    const layout = {
      showlegend: false,
      autosize: true,
      title: 'Score and content rating',
      xaxis: {
        title: 'IMDB core'
      },
      yaxis: {
        title: 'Content rating'
      },
      width: 980,
      height: 500
    };

    Plotly.newPlot(this.chartContainer, data, layout);

  }


  drawAverageDirectorIMDB() {

    const grouped = this.dataConverters.groupBy(imdbData, data => data.director_name);

    const data = [{
      type: 'bar',
      y: Array.from(grouped.keys()).splice(0, 20),
      x: Array.from(grouped.values()).map((groupedElement) => groupedElement.reduce((acc, currentElement) => {
        return acc + currentElement.imdb_score
      }, 0) / groupedElement.length).splice(0, 20),
      orientation: 'h'
    }];

    const layout = {
      showlegend: false,
      autosize: false,
      title: 'Director and average',
      xaxis: {
        title: 'IMDB score average'
      },
      yaxis: {
        title: 'Director name'
      },
      margin: {
        l: 200,
        r: 10,
        b: 100,
        t: 100,
        pad: 10
      },
      width: 950,
      height: 500
    };

    Plotly.newPlot(this.chartContainer, data, layout);

  }


  drawFacebookLikeDotsIMDB() {
    const grouped = this.dataConverters.groupBy(imdbData, data => data.content_rating);

    const data = Array.from(grouped.values()).map((groupedArray, index) => {
      return {
        x: groupedArray.map((groupedObject) => groupedObject.movie_facebook_likes),
        y: groupedArray.map((groupedObject) => groupedObject.imdb_score),
        mode: 'markers',
        type: 'scatter',
        text: groupedArray.map((groupedObject) => `Content: ${groupedObject.content_rating}`),
        name: Array.from(grouped.keys())[index]
      }
    });

    const layout = {
      showlegend: false,
      autosize: true,
      title: 'Facebook likes and IMDB score',
      xaxis: {
        title: 'Facebook likes for movie'
      },
      yaxis: {
        title: 'IMDB score'
      },
      width: 980,
      height: 500
    };

    Plotly.newPlot(this.chartContainer, data, layout);

  }


  drawDirectorBudgetIMDB() {
    const grouped = this.dataConverters.groupBy(imdbData, data => data.content_rating);

    const data = Array.from(grouped.values()).map((groupedArray, index) => {
      return {
        x: groupedArray.map((groupedObject) => groupedObject.movie_facebook_likes),
        y: groupedArray.map((groupedObject) => groupedObject.budget),
        mode: 'markers',
        type: 'scatter',
        text: groupedArray.map((groupedObject) => `Movie: ${groupedObject.movie_title}`),
        name: Array.from(grouped.keys())[index]
      }
    });

    const layout = {
      showlegend: false,
      autosize: true,
      title: 'Facebook director likes and budget',
      xaxis: {
        title: 'Facebook likes for cast'
      },
      yaxis: {
        title: 'Budget'
      },
      width: 980,
      height: 500
    };

    Plotly.newPlot(this.chartContainer, data, layout);

  }


  drawDirectorLikesIMDB() {
    const grouped = this.dataConverters.groupBy(imdbData, data => data.content_rating);

    const data = Array.from(grouped.values()).map((groupedArray, index) => {
      return {
        x: groupedArray.map((groupedObject) => groupedObject.director_facebook_likes),
        y: groupedArray.map((groupedObject) => groupedObject.imdb_score),
        mode: 'markers',
        type: 'scatter',
        text: groupedArray.map((groupedObject) => `Movie: ${groupedObject.movie_title}`),
        name: Array.from(grouped.keys())[index]
      }
    });

    const layout = {
      showlegend: false,
      autosize: true,
      title: 'Facebook director likes and IMDB score',
      xaxis: {
        title: 'Facebook likes for director'
      },
      yaxis: {
        title: 'IMDB score'
      },
      width: 980,
      height: 500
    };

    Plotly.newPlot(this.chartContainer, data, layout);

  }


  drawMovieGrossIMDB() {

    const grouped = this.dataConverters.groupBy(imdbData, data => data.title_year);

    const trace1 = {
      x: Array.from(grouped.keys()),
      y: Array.from(grouped.values()).map((groupedElement) => groupedElement.reduce((acc, currentElement) => {
        return (currentElement.gross - currentElement.budget) < 0 ? acc + 1 : acc
      }, 0)),
      mode: 'lines',
      connectgaps: true
    };

    const data = [trace1];

    const layout = {
      showlegend: false,
      autosize: true,
      title: 'Year and low gross',
      xaxis: {
        title: 'Title year'
      },
      yaxis: {
        title: 'Low gross'
      },
      width: 980,
      height: 500
    };


    Plotly.newPlot(this.chartContainer, data, layout);

  }


}
