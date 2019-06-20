import 'ol/ol.css';
import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import View from 'ol/View.js';
import {toStringHDMS} from 'ol/coordinate.js';
import TileLayer from 'ol/layer/Tile.js';
import {fromLonLat, toLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM.js';
import ImageLayer from 'ol/layer/Image.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import {getCenter} from 'ol/extent.js';


  var layer = new TileLayer({
    source: new OSM()
  });

  var extent = [0, 0, 1200, 850];
  var projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: extent
  });
  var image_layer = new ImageLayer({
    source: new Static({
      attributions: '© <a href="https://twitter.com/KDMG_tl/">屠竜の王と門の神子</a>',
      url: 'https://pbs.twimg.com/media/Dqg10LzUcAA2JX7.jpg',
      projection: projection,
      imageExtent: extent
    })
  });

  var map = new Map({
    layers: [layer, image_layer],
    target: 'map',
    view: new View({
      projection: projection,
      center: getCenter(extent),
      zoom: 2,
      maxZoom: 4
    })
  });

  var pos_king = [241, 280];


  // Vienna marker
  var marker = new Overlay({
    position: pos_king,
    positioning: 'center-center',
    element: document.getElementById('marker'),
    stopEvent: false
  });
  map.addOverlay(marker);

  // Vienna label
  var vienna = new Overlay({
    position: pos_king,
    element: document.getElementById('king1')
  });
  map.addOverlay(vienna);

  // Popup showing the position the user clicked
  var popup = new Overlay({
    element: document.getElementById('popup')
  });
  map.addOverlay(popup);
  var fs = require('fs');
  var data = fs.readFileSync('king1.html', 'utf8');


  map.on('click', function(evt) {
    var element = popup.getElement();
    var coordinate = evt.coordinate;
    var hdms = toStringHDMS(toLonLat(coordinate));

    $(element).popover('destroy');
    popup.setPosition(coordinate);
    $(element).popover({
      placement: 'right',
      animation: false,
      html: true,
      content: data + '<p>経緯度</p><code>' + hdms + '</code>'
    });
    $(element).popover('show');
  });
