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

var twitter = [
  {king_num:0,pos:[241, 280], url:"https://twitter.com/josm_josm/status/1086533026148831232",
  html: '\u003Cblockquote class=\"twitter-tweet\"\u003E\u003Cp lang=\"ja\" dir=\"ltr\"\u003E\u003Ca href=\"https:\/\/twitter.com\/KDMG_tl?ref_src=twsrc%5Etfw\"\u003E@KDMG_tl\u003C\/a\u003E 【再投稿】マクシムス＝ケラヴノス\u003Cbr\u003E寝がえりが片方しかできないドラゴスティア王です。\u003Cbr\u003Eよろしくお願いします。\u003Ca href=\"https:\/\/twitter.com\/hashtag\/KDMG_CS?src=hash&amp;ref_src=twsrc%5Etfw\"\u003E#KDMG_CS\u003C\/a\u003E　\u003Ca href=\"https:\/\/twitter.com\/hashtag\/KDMG_%E7%8E%8B?src=hash&amp;ref_src=twsrc%5Etfw\"\u003E#KDMG_王\u003C\/a\u003E \u003Ca href=\"https:\/\/t.co\/livB6kLgKz\"\u003Epic.twitter.com\/livB6kLgKz\u003C\/a\u003E\u003C\/p\u003E&mdash; ジョーススム (@josm_josm) \u003Ca href=\"https:\/\/twitter.com\/josm_josm\/status\/1086533026148831232?ref_src=twsrc%5Etfw\"\u003EJanuary 19, 2019\u003C\/a\u003E\u003C\/blockquote\u003E\n\u003Cscript async src=\"https:\/\/platform.twitter.com\/widgets.js\" charset=\"utf-8\"\u003E\u003C\/script\u003E\n'
  },
  {king_num:1,pos:[264, 704], url:"https://twitter.com/nekodume_xxx/status/1139172395795722241",
  html:'\u003Cblockquote class=\"twitter-tweet\"\u003E\u003Cp lang=\"ja\" dir=\"ltr\"\u003E此方の企画様（\u003Ca href=\"https:\/\/twitter.com\/KDMG_tl?ref_src=twsrc%5Etfw\"\u003E@KDMG_tl\u003C\/a\u003E）にドラゴスティアの元奴隷の王様でお邪魔します！過去が重たくて色々拗らせてる感じですが、よろしければ遊んでやってくださ～い！宜しくお願いします。\u003Ca href=\"https:\/\/twitter.com\/hashtag\/KDMG_CS?src=hash&amp;ref_src=twsrc%5Etfw\"\u003E#KDMG_CS\u003C\/a\u003E\u003Ca href=\"https:\/\/twitter.com\/hashtag\/KDMG_%E7%8E%8B?src=hash&amp;ref_src=twsrc%5Etfw\"\u003E#KDMG_王\u003C\/a\u003E \u003Ca href=\"https:\/\/t.co\/21slmTcwwP\"\u003Epic.twitter.com\/21slmTcwwP\u003C\/a\u003E\u003C\/p\u003E&mdash; 猫ヅメ (@nekodume_xxx) \u003Ca href=\"https:\/\/twitter.com\/nekodume_xxx\/status\/1139172395795722241?ref_src=twsrc%5Etfw\"\u003EJune 13, 2019\u003C\/a\u003E\u003C\/blockquote\u003E\n\u003Cscript async src=\"https:\/\/platform.twitter.com\/widgets.js\" charset=\"utf-8\"\u003E\u003C\/script\u003E\n'
  },
  {king_num:3, pos:[931, 276], url:"https://twitter.com/30h_sk/status/1125301424588328960",
  html:'\u003Cblockquote class=\"twitter-tweet\"\u003E\u003Cp lang=\"ja\" dir=\"ltr\"\u003Eこちらの世界観【\u003Ca href=\"https:\/\/twitter.com\/KDMG_tl?ref_src=twsrc%5Etfw\"\u003E@KDMG_tl\u003C\/a\u003E 】に王で5人目失礼します〜！！\u003Cbr\u003E傭兵事業で食いつないできた寒〜い地域の国の無骨な王です。とある神子に一目惚れして暑苦しいほどの愛を伝えて契約にこじつけました；事前契約済みですがぜひみなさんのキャラとお話させてください〜！\u003Ca href=\"https:\/\/twitter.com\/hashtag\/KDMG_CS?src=hash&amp;ref_src=twsrc%5Etfw\"\u003E#KDMG_CS\u003C\/a\u003E \u003Ca href=\"https:\/\/twitter.com\/hashtag\/KDMG_%E7%8E%8B?src=hash&amp;ref_src=twsrc%5Etfw\"\u003E#KDMG_王\u003C\/a\u003E \u003Ca href=\"https:\/\/twitter.com\/hashtag\/KDMG_%E9%96%A2%E4%BF%82%E5%8B%9F%E9%9B%86?src=hash&amp;ref_src=twsrc%5Etfw\"\u003E#KDMG_関係募集\u003C\/a\u003E \u003Ca href=\"https:\/\/t.co\/znDKJl5gFS\"\u003Epic.twitter.com\/znDKJl5gFS\u003C\/a\u003E\u003C\/p\u003E&mdash; はむｶﾂ【平日低浮上】 (@30h_sk) \u003Ca href=\"https:\/\/twitter.com\/30h_sk\/status\/1125301424588328960?ref_src=twsrc%5Etfw\"\u003EMay 6, 2019\u003C\/a\u003E\u003C\/blockquote\u003E\n\u003Cscript async src=\"https:\/\/platform.twitter.com\/widgets.js\" charset=\"utf-8\"\u003E\u003C\/script\u003E\n'
  }
];


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
/*
//Forを使ってループで処理するか、Appendでｯ活で出来ないか調べる
var icons = [];
for(var i =0; i <2; i++){
  var iconFeature = new Feature({
    geometry: new Point([twitter[i].pos[0], twitter[i].pos[1]]),
    name: twitter[i].html,
  });
  iconFeature.setStyle(iconStyle);
};

*/
var iconFeature = new Feature({
  geometry: new Point(twitter[0].pos),
  name: twitter[0].html,
});
iconFeature.setStyle(iconStyle);

var iconFeature2 = new Feature({
  geometry: new Point(twitter[1].pos),
  name: twitter[1].html,
});
iconFeature2.setStyle(iconStyle);

var iconFeature3 = new Feature({
  geometry: new Point(twitter[2].pos),
  name: twitter[2].html,
});
iconFeature3.setStyle(iconStyle);

var icons = [iconFeature, iconFeature2, iconFeature3];

var vectorSource = new VectorSource({
  features: icons
});



var vectorLayer = new VectorLayer({
  source: vectorSource
});

var rasterLayer = new TileLayer({
  source: new TileJSON({
    url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
    crossOrigin: ''
  })
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
  layers: [imageLayer, rasterLayer, vectorLayer],
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
  $(element).popover('destroy');
  if (e.dragging) {
    $(element).popover('destroy');
    return;
  }
  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});
