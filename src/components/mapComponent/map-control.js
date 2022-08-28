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


//marker center map
var lat =10.49644444444;
var lon =-75.124166666667;
var marker = L.marker([lat, lon],{
  icon:imgIcon('marker-icon.28bcaf97.png', [25, 41]),
  draggable: true,
  autoPan: true
}).addTo(map);

map.on("move", function () {
  marker.setLatLng(map.getCenter())
})

marker.on("move", function (obj) {
  const newCoord = obj.latlng

})


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
