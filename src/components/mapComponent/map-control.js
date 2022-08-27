import "leaflet/dist/leaflet.css";
import "./map.scss";

const L = require("leaflet");
import { dark_nolabels, light_only_labels } from "./layers/control-layers";
import { imgIcon } from "./controls/icons/imgIcon";
import { minimap } from "./controls/minimap";
import { predios } from "./layers/predios";
import { perimeter} from "./layers/perimeter";
import { Modal } from "bootstrap";

export var map = L.map("map", {
  center: [0, 0],
  zoom: 15,
  layers: [dark_nolabels, light_only_labels],
});

//Marker
const repelon = L.marker([10.496444444444, -75.124166666667], {
  icon: imgIcon('https://cdn-icons-png.flaticon.com/512/684/684908.png', [41, 41]),
  }).addTo(map);

//location REPELON
map.fitBounds([[repelon.getLatLng().lat, repelon.getLatLng().lng]]).setZoom(15);

//minimap
minimap.addTo(map);

// Popup
function popup (features,layers){
  if(features.properties && feature.properties.codigo)
   layers.bindpopup("<strong>CODIGO: </strong>" + features.properties.codigo +"<br/>"+"<strong>CODIGO: </strong>"+ features.properties.area)
};

// GeoJson
L.geoJson(predios).addTo(map);
L.geoJson(perimeter).addTo(map);

var prediosJS = L.geoJson(predios,{
    onEachFeature: popup()
}).addTo(map);


L.control.zoom({ position: "topright" }).addTo(map);

// scale control
new L.control.scale({ imperial: false }).addTo(map);
