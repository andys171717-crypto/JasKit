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

let selectedLatitude =
-6.2088;

let selectedLongitude =
106.8456;

let selectedAddress =
"Belum memilih lokasi.";

const addressBox =
document.getElementById(
"selectedAddress"
);

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(

(position)=>{

const lat =
position.coords.latitude;

const lng =
position.coords.longitude;

selectedLatitude =
lat;

selectedLongitude =
lng;

window.map.setView(
[lat,lng],
16
);

marker.setLatLng(
[lat,lng]
);

},

()=>{

console.log(
"GPS ditolak user"
);

}

);

}
