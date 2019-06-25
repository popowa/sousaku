// https://openlayers.org/en/latest/examples/icon.html?q=Marker 次をこれ見る

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {getCenter} from 'ol/extent.js';
import ImageLayer from 'ol/layer/Image.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';


// icon
import Feature from 'ol/Feature.js';
import Overlay from 'ol/Overlay.js';
import Point from 'ol/geom/Point.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import TileJSON from 'ol/source/TileJSON.js';
import VectorSource from 'ol/source/Vector.js';
import {Icon, Style} from 'ol/style.js';



/* Twitter データ */
//https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/overview.html
//https://publish.twitter.com/oembed?url=https://twitter.com/nekodume_xxx/status/1139172395795722241

var fs = require('fs');
var twitter = JSON.parse(fs.readFileSync('./twitter.json', 'utf8'));


/* Projectを作成 */

var extent = [0, 0, 1200, 850];
//var extent = [0, 0, 3500, 2150];
var projection = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: extent
});

// アイコンのスタイル設定
var iconStyle = new Style({
  image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'https://openlayers.org/en/latest/examples/data/icon.png'
  }))
});

/*アイコンの情報*/
//https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html
//https://openlayers.org/en/latest/examples/icon.html?q=Marker


var icons = [];
var iconFeature = [];
for(var i =0; i <twitter.length; i++){
  iconFeature[i] = new Feature({
    geometry: new Point([twitter[i].pos[0], twitter[i].pos[1]]),
    name: twitter[i].html,
  });
  iconFeature[i].setStyle(iconStyle);
  icons.push(iconFeature[i]);
};

var vectorSource = new VectorSource({
  features: icons
});
var vectorLayer = new VectorLayer({
  source: vectorSource
});
var imageLayer = new ImageLayer({
      source: new Static({
        attributions: '© <a href="https://twitter.com/KDMG_tl/">屠竜の王と門の神子</a>',
        url: 'https://pbs.twimg.com/media/Dqg10LzUcAA2JX7.jpg',
        projection: projection,
        imageExtent: extent
      })
    });

// Icon ↑

var map = new Map({
  layers: [imageLayer, vectorLayer],
  target: document.getElementById('map'),
  view: new View({
    projection: projection,
    center: getCenter(extent),
    zoom: 3,
    maxZoom: 10
  })
});


///  ポップアップ関連
//https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html
var element = document.getElementById('popup');
var popup = new Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: true,
  offset: [50, 0],
  autoPan: true
});
map.addOverlay(popup);

// display popup on click
map.on('click', function(evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
    function(feature) {
      return feature;
    });
  if (feature) {
    var coordinates = feature.getGeometry().getCoordinates();
    popup.setPosition(coordinates);
    $(element).popover({
      placement: 'right',
      html: true,
      content: feature.get('name')
    });
    $(element).popover('show');
  } else {
    $(element).popover('destroy');
  }
});

// change mouse cursor when over marker
map.on('pointermove', function(e) {
  //$(element).popover('destroy');
  if (e.dragging) {
    $(element).popover('destroy');
    return;
  }
  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});
