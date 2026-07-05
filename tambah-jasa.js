import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

import {
getAuth,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import {
initServiceImage,
getServiceImageUrl
}
from "./service-image.js";

import {
getServiceLocation
}
from "./service-location.js";

const firebaseConfig = {
apiKey: "AIzaSyCnk56ZY63q2h1ewEdiivzB0rrSfJOJtYo",
authDomain: "jasaku-92b55.firebaseapp.com",
projectId: "jasaku-92b55",
storageBucket: "jasaku-92b55.firebasestorage.app",
messagingSenderId: "217601622524",
appId: "1:217601622524:web:e3bc48dbdc50d7cb10b279"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(
auth,
(user)=>{

document.body.style.display =
"block";

initServiceImage();

if(!user){

window.location.href =
"index.html";

}

const lokasi =
getServiceLocation();

const locationText =
document.getElementById(
"serviceLocationText"
);

const btnLokasi =
document.getElementById(
"btnPilihLokasi"
);

if(
lokasi.latitude !== null &&
lokasi.longitude !== null
){

locationText.textContent =

lokasi.addressDisplay ||
`${lokasi.latitude.toFixed(6)}, ${lokasi.longitude.toFixed(6)}`;

btnLokasi.innerHTML =

'<i class="fa-solid fa-pen-to-square"></i> Ubah Lokasi';

}

}
);

document
.getElementById("btnSimpan")
.addEventListener(
"click",
simpanJasa
);

async function simpanJasa(){

const namaJasa =
document.getElementById("namaJasa").value;

const kategori =
document.getElementById("kategori").value;

const serviceType =
document.getElementById("serviceType").value;

const harga =
document.getElementById("harga").value;

const alamatOperasional =
document.getElementById(
"alamatOperasional"
).value;

const deskripsi =
document.getElementById("deskripsi").value;

const lokasi =
getServiceLocation();

if(
namaJasa.trim()==="" ||
kategori.trim()==="" ||
serviceType.trim()==="" ||
harga.trim()==="" ||
deskripsi.trim()===""
){

alert(
"Semua data wajib diisi"
);

return;

}

try{

await addDoc(
collection(db,"services"),
{
userId:
auth.currentUser.uid,

namaJasa,
kategori,
serviceType,
harga,

alamatOperasional,

deskripsi,

coverImage:
getServiceImageUrl(),

latitude:
lokasi.latitude,

longitude:
lokasi.longitude,

addressDisplay:
lokasi.addressDisplay,

status:"aktif",

createdAt:
Date.now()

}
);

alert(
"Jasa berhasil ditambahkan"
);

window.location.href =
"index.html";

}catch(error){

alert(
error.message
);

}

}
