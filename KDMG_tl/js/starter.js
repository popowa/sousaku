//
// Marker and Popup Sample
// http://dev.openlayers.org/examples/osm-marker-popup.html
//
// 逕ｻ蜒上�荳玖ｨ倥ョ繧｣繝ｬ繧ｯ繝医Μ縺九ｉ諡晏�
// http://dev.openlayers.org/img/
//

var map;
var select;
function marker_popup_sample_2() {

    // The overlay layer for our marker, with a simple diamond as symbol
    var overlay = new OpenLayers.Layer.Vector('Overlay', {
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: 'https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.13.1/img/marker.png',
            graphicWidth: 20, graphicHeight: 24, graphicYOffset: -24,
            title: '${tooltip}'
        })
    });

	var features = new Array(50);
	for (var i=0; i<features.length; i++) {
		features[i] = new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.Point(
						(360 * Math.random()) - 180, (180 * Math.random()) - 90
				)
				.transform(
		            new OpenLayers.Projection("EPSG:4326"),
		            new OpenLayers.Projection("EPSG:900913")
				), {
					tooltip: "random marker",
					description: "number is " + (5 + parseInt(5 * Math.random()))
				}
		);
	}

    // We add the marker with a tooltip text to the overlay
    overlay.addFeatures(features);

    overlay.events.on({
		'featureselected': onFeatureSelect,
		'featureunselected': onFeatureUnselect
	});

    // Finally we create the map
    map = new OpenLayers.Map("demoMap");

    map.addLayers([new OpenLayers.Layer.OSM(
			"OpenStreetMap",
		    // Official OSM tileset as protocol-independent URLs
			   [
		       	'//a.tile.openstreetmap.org/${z}/${x}/${y}.png',
		        '//b.tile.openstreetmap.org/${z}/${x}/${y}.png',
			    '//c.tile.openstreetmap.org/${z}/${x}/${y}.png'
			],
			null
	    ), overlay]);

	// Create a select feature control and add it to the map.
	select = new OpenLayers.Control.SelectFeature(overlay);
	map.addControl(select);
	select.activate();

    map.setCenter(new OpenLayers.LonLat(0, 0), 1);
}

function onPopupClose(evt) {
	select.unselect(this.feature);
}
function onFeatureSelect(evt) {
	var feature = evt.feature;
    var content = '<a target="_blank" href="http://openlayers.org/">We</a> ' + 'could be here.<br>number: ';

	popup = new OpenLayers.Popup.FramedCloud("featurePopup",
						feature.geometry.getBounds().getCenterLonLat(),
						new OpenLayers.Size(100, 100),
						content + feature.attributes.description,
						null, true, onPopupClose);
	feature.popup = popup;
	popup.feature = feature;
	map.addPopup(popup);
}
function onFeatureUnselect(evt) {
	var feature = evt.feature;
	if (feature.popup) {
		popup.feature = null;
		map.removePopup(feature.popup);
		feature.popup.destroy();
		feature.popup = null;
	}
}
