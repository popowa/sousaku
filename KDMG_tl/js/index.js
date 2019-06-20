import 'ol/ol.css';
import {Map, View} from 'ol';
import {getCenter} from 'ol/extent.js';
import ImageLayer from 'ol/layer/Image.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';



import Feature from 'ol/Feature.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Circle from 'ol/geom/Circle.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';

var extent = [0, 0, 1200, 850];
var projection = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: extent
});

var map = new Map({
  layers: [
    new ImageLayer({
      source: new Static({
        attributions: '© <a href="https://twitter.com/KDMG_tl/">屠竜の王と門の神子</a>',
        url: 'https://pbs.twimg.com/media/Dqg10LzUcAA2JX7.jpg',
        projection: projection,
        imageExtent: extent
      })
    })
  ],
  target: 'map',
  view: new View({
    projection: projection,
    center: getCenter(extent),
    zoom: 2,
    maxZoom: 8
  })
});
