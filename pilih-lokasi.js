import {
setServiceLocation
}
from "./service-location.js";

const map = L.map("map").setView(

[-6.2088,106.8456],

13

);

const tileLayer = L.tileLayer(

"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

{

maxZoom:19,

attribution:"© OpenStreetMap"

}

);

tileLayer.addTo(map);

tileLayer.on(

"load",

()=>{

if(mapLoading){

mapLoading.style.display =
"none";

}

}
);

let selectedLatitude = null;
let selectedLongitude = null;
let selectedAddress = "";

const marker = L.marker(

[-6.2088,106.8456],

{

draggable:true

}

).addTo(map);

marker.on(

"dragend",

async()=>{

const position =
marker.getLatLng();

await moveToLocation(

position.lat,

position.lng

);

await updateAddress();

}

);

const addressBox =
document.getElementById(
"selectedAddress"
);

const mapLoading =
document.getElementById(
"mapLoading"
);

const btnBack =
document.getElementById(
"btnBack"
);

const btnMyLocation =
document.getElementById(
"btnMyLocation"
);

const btnGunakanLokasi =
document.getElementById(
"btnGunakanLokasi"
);

const searchInput =
document.getElementById(
"searchLocation"
);

btnBack.onclick=()=>{

window.history.back();

};

btnMyLocation.onclick =
goToMyLocation;

async function moveToLocation(
lat,
lng
){

selectedLatitude = lat;
selectedLongitude = lng;

marker.setLatLng(
[lat,lng]
);

map.setView(
[lat,lng],
16
);

}

async function updateAddress(){

if(
selectedLatitude===null ||
selectedLongitude===null
){

return;

}

try{

addressBox.textContent =
"Mengambil alamat...";

const response =
await fetch(

`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${selectedLatitude}&lon=${selectedLongitude}`,

{

headers:{
"Accept":"application/json"
}

}

);

if(!response.ok){

throw new Error(
response.status
);

}

const data =
await response.json();

selectedAddress =
data.display_name ||
"Alamat tidak ditemukan";

addressBox.textContent =
selectedAddress;

}catch(error){

console.error(error);

addressBox.textContent =
"Gagal mengambil alamat";

}

}

async function goToMyLocation(){

if(!navigator.geolocation){

alert(
"Browser tidak mendukung GPS."
);

return;

}

navigator.geolocation.getCurrentPosition(

async(position)=>{

await moveToLocation(

position.coords.latitude,

position.coords.longitude

);

await updateAddress();

},

()=>{

alert(
"Gagal mendapatkan lokasi."
);

}

);

}

window.addEventListener(

"load",

()=>{

setTimeout(

()=>{

map.invalidateSize();

goToMyLocation();

},

200

);

}
);
