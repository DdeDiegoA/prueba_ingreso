import "leaflet/dist/leaflet.css";
import "./map.scss";

const L = require("leaflet");
import { dark_nolabels, light_only_labels } from "./layers/control-layers";
import { imgIcon } from "./controls/icons/imgIcon";
import { minimap } from "./controls/minimap";
import { predios } from "./layers/predios";
import { perimeter} from "./layers/perimeter";
import { dynamicMarker } from "./controls/markers";


export var map = L.map("map", {
  center: [10.496444444444, -75.124166666667],
  zoom: 15,
  layers: [dark_nolabels, light_only_labels],
});


//Marker
const repelon = L.marker([10.496444444444, -75.124166666667], {
  icon: imgIcon('marker-icon.28bcaf97.png', [25, 41]),
  }).addTo(map);
  map.on('move', function () {
		marker.setLatLng(map.getCenter());
		//console.log(map.getCenter());
	});
	//Dragend event of map for update marker position
	map.on('dragend', function(e) {
		var cnt = map.getCenter();
	        var position = marker.getLatLng();
		lat = Number(position['lat']).toFixed(5);
		lng = Number(position['lng']).toFixed(5);
		//console.log(position);
		setLeafLatLong(lat, lng);
		
	});
// const center = L.marker([0, 0], {
//     icon: imgIcon('marker-icon.28bcaf97.png', [25, 41]),
//     }).addTo(map);

// // //location REPELON
// map.fitBounds([[repelon.getLatLng().lat, repelon.getLatLng().lng]]).setZoom(15);

//minimap
minimap.addTo(map);

// GeoJson
L.geoJson(perimeter).addTo(map);
L.geoJSON(predios,{
  style: function (feature) {
    return {
      stroke: true,
      color: "blue", 
      weight: 1};
  },

  onEachFeature: function(feature,layer) {
    layer.bindPopup("<strong>CODIGO: </strong>" + feature.properties.codigo +"<br/>"+"<strong>AREA: </strong>"+ feature.properties.area)
  },
  
}).addTo(map);



L.control.zoom({ position: "topright" }).addTo(map);

// scale control
new L.control.scale({ imperial: false }).addTo(map);
