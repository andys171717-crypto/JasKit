import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
getFirestore,
doc,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {

apiKey:"AIzaSyCnk56ZY63q2h1ewEdiivzB0rrSfJOJtYo",

authDomain:"jasaku-92b55.firebaseapp.com",

projectId:"jasaku-92b55",

storageBucket:"jasaku-92b55.firebasestorage.app",

messagingSenderId:"217601622524",

appId:"1:217601622524:web:e3bc48dbdc50d7cb10b279"

};

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

const params =
new URLSearchParams(
window.location.search
);

const requestId =
params.get("id");

loadRequest();

async function loadRequest(){

if(!requestId){

document.getElementById(
"providerCard"
).innerHTML=

"<h3>Data transaksi tidak ditemukan.</h3>";

return;

}

const snap=

await getDoc(

doc(
db,
"requests",
requestId
)

);

if(!snap.exists()){

document.getElementById(
"providerCard"
).innerHTML=

"<h3>Transaksi tidak ditemukan.</h3>";

return;

}

const data=
snap.data();

renderProvider(data);

}
