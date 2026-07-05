window.map = L.map("map").setView(
[-6.2088,106.8456],
13
);

L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
{

maxZoom:19,

attribution:"© OpenStreetMap"

}

).addTo(window.map);

const marker =
L.marker(
[-6.2088,106.8456],
{

draggable:true

}

).addTo(window.map);
