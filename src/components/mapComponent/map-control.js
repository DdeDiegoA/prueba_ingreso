import "leaflet/dist/leaflet.css";
import "./map.scss";

const L = require("leaflet");
import { dark_nolabels, light_only_labels } from "./layers/control-layers";
import { imgIcon } from "./controls/icons/imgIcon";
import { minimap } from "./controls/minimap";

export var map = L.map("map", {
  center: [0, 0],
  zoom: 15,
  layers: [dark_nolabels, light_only_labels],
});

const repelon = L.marker([10.494444444444, -75.124166666667], {
  icon: imgIcon('marker-icon.28bcaf97.png', [25, 41]),
  }).addTo(map);

map.fitBounds([[repelon.getLatLng().lat, repelon.getLatLng().lng]]).setZoom(15);

minimap.addTo(map);

L.control.zoom({ position: "topright" }).addTo(map);

// scale control
new L.control.scale({ imperial: false }).addTo(map);
