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
import MultiPoint from 'ol/geom/MultiPoint.js';

/* here */
var styles = [
   /* We are using two different styles for the polygons:
    *  - The first style is for the polygons themselves.
    *  - The second style is to draw the vertices of the polygons.
    *    In a custom `geometry` function the vertices of a polygon are
    *    returned as `MultiPoint` geometry, which will be used to render
    *    the style.
    */
   new Style({
     stroke: new Stroke({
       color: 'blue',
       width: 3
     }),
     fill: new Fill({
       color: 'rgba(0, 0, 255, 0.1)'
     })
   }),
   new Style({
     image: new CircleStyle({
       radius: 5,
       fill: new Fill({
         color: 'orange'
       })
     }),
     geometry: function(feature) {
       // return the coordinates of the first ring of the polygon
       var coordinates = feature.getGeometry().getCoordinates()[0];
       return new MultiPoint(coordinates);
     }
   })
 ];

 var geojsonObject = {
   'type': 'FeatureCollection',
   'crs': {
     'type': 'name',
     'properties': {
       'name': 'EPSG:3857'
     }
   },
   'features': [{
     'type': 'Feature',
     'geometry': {
       'type': 'Polygon',
       'coordinates': [[[-5e6, 6e6], [-5e6, 8e6], [-3e6, 8e6],
         [-3e6, 6e6], [-5e6, 6e6]]]
     }
   }, {
     'type': 'Feature',
     'geometry': {
       'type': 'Polygon',
       'coordinates': [[[-2e6, 6e6], [-2e6, 8e6], [0, 8e6],
         [0, 6e6], [-2e6, 6e6]]]
     }
   }, {
     'type': 'Feature',
     'geometry': {
       'type': 'Polygon',
       'coordinates': [[[1e6, 6e6], [1e6, 8e6], [3e6, 8e6],
         [3e6, 6e6], [1e6, 6e6]]]
     }
   }, {
     'type': 'Feature',
     'geometry': {
       'type': 'Polygon',
       'coordinates': [[[-2e6, -1e6], [-1e6, 1e6],
         [0, -1e6], [-2e6, -1e6]]]
     }
   }]
 };

 var source = new VectorSource({
   features: (new GeoJSON()).readFeatures(geojsonObject)
 });

 var layer = new VectorLayer({
   source: source,
   style: styles
 });
/* her e*/



var extent = [0, 0, 1200, 850];
var projection = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: extent
});

var map = new Map({
  layers: [
    layer,
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
    maxZoom: 4
  })
});
