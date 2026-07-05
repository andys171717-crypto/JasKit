import {
setServiceLocation
}
from "./service-location.js";

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

const btnGunakanLokasi =
document.getElementById(
"btnGunakanLokasi"
);

const btnBack =
document.getElementById(
"btnBack"
);

const btnMyLocation =
document.getElementById(
"btnMyLocation"
);

btnGunakanLokasi.addEventListener(

"click",

()=>{

setServiceLocation({

latitude:
selectedLatitude,

longitude:
selectedLongitude,

addressDisplay:
selectedAddress

});

window.location.href =
"tambah-jasa.html";

}

);

btnBack.addEventListener(

"click",

()=>{

window.history.back();

}

);

btnMyLocation.addEventListener(

"click",

()=>{

if(!navigator.geolocation){

alert(
"Browser tidak mendukung GPS."
);

return;

}

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

marker.setLatLng(
[lat,lng]
);

window.map.setView(
[lat,lng],
16
);

// Nanti kita aktifkan lagi
// updateAddress(lat,lng);

},

()=>{

alert(
"Gagal mendapatkan lokasi."
);

}

);

}

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

// updateAddress(
// lat,
// lng
// );

},

()=>{

console.log(
"GPS ditolak user"
);

}

);

}

async function updateAddress(
lat,
lng
){

try{

addressBox.textContent =
"Mengambil alamat...";

const response =
await fetch(

`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,

{

headers:{

"Accept":"application/json"

}

}

);

if(!response.ok){

throw new Error(
"HTTP " + response.status
);

}

const data =
await response.json();

console.log(
"Nominatim:",
data
);

selectedAddress =
data.display_name ||
"Alamat tidak ditemukan";

addressBox.textContent =
selectedAddress;

}catch(error){

console.error(
error
);

addressBox.textContent =

"Gagal mengambil alamat";

}

}

marker.on(

"dragend",

()=>{

const position =
marker.getLatLng();

selectedLatitude =
position.lat;

selectedLongitude =
position.lng;

// updateAddress(
// selectedLatitude,
// selectedLongitude
// );

console.log(

"Marker dipindahkan:",

selectedLatitude,

selectedLongitude

);

}

);
