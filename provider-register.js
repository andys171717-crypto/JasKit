import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
getFirestore,
doc,
setDoc,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

import {
getAuth,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import {
generateProviderCode
}
from "./counter.js";

const firebaseConfig = {

apiKey: "AIzaSyCnk56ZY63q2h1ewEdiivzB0rrSfJOJtYo",

authDomain:
"jasaku-92b55.firebaseapp.com",

projectId:
"jasaku-92b55",

storageBucket:
"jasaku-92b55.firebasestorage.app",

messagingSenderId:
"217601622524",

appId:
"1:217601622524:web:e3bc48dbdc50d7cb10b279"

};

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

const auth =
getAuth(app);

let currentUser = null;

onAuthStateChanged(
auth,
(user)=>{
    
console.log("USER:", user);   

if(!user){

window.location.href =
"index.html";

return;

}

currentUser = user;

}
);

document
.getElementById(
"btnSaveProvider"
)
.addEventListener(
"click",
async ()=>{

console.log(currentUser);  
    
const businessName =
document
.getElementById(
"businessName"
)
.value
.trim();

if (businessName.length < 3) {

alert("Nama usaha minimal 3 karakter.");

return;

}

const phone =
document
.getElementById(
"phone"
)
.value
.trim();

if (!/^08\d{8,13}$/.test(phone)) {

alert("Masukkan nomor WhatsApp yang valid, diawali dengan 08.");

return;

}

const description =
document
.getElementById(
"description"
)
.value
.trim();

if (description.length > 0 && description.length < 20) {

alert("Deskripsi usaha minimal 20 karakter atau kosongkan.");

return;

}

if(
!businessName ||
!phone
){

alert(
"Semua data wajib diisi"
);

return;

}

try{

const providerCode =
await generateProviderCode(db);

await setDoc(
doc(
db,
"users",
currentUser.uid
),
    
{
businessName,
phone,
description,

providerCode,

providerProfileComplete:true,
providerStatus:"approved",
role:"provider"
},
{
merge:true
}
);

alert(
"Profil provider berhasil disimpan"
);

window.location.href =
"tambah-jasa.html";

}catch(error){

console.error(error);

alert(error.message);

}

}
);
