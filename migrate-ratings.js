import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import{
getFirestore,
collection,
getDocs,
doc,
getDoc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig={

apiKey:"AIzaSyCnk56ZY63q2h1ewEdiivzB0rrSfJOJtYo",

authDomain:"jasaku-92b55.firebaseapp.com",

projectId:"jasaku-92b55",

storageBucket:"jasaku-92b55.firebasestorage.app",

messagingSenderId:"217601622524",

appId:"1:217601622524:web:e3bc48dbdc50d7cb10b279"

};

const app=
initializeApp(firebaseConfig);

const db=
getFirestore(app);

const log=
document.getElementById("log");

const button=
document.getElementById("startMigration");

button.onclick=
async()=>{

button.disabled=true;

let success=0;

let failed=0;

log.textContent=
"Membaca koleksi ratings...";

try{

const ratingsSnapshot=
await getDocs(
collection(
db,
"ratings"
)
);

for(
const ratingDoc
of ratingsSnapshot.docs
){

const ratingData=
ratingDoc.data();

if(
ratingData.serviceId
){

continue;

}

if(
!ratingData.requestId
){

failed++;

continue;

}

try{

const requestRef=
doc(
db,
"requests",
ratingData.requestId
);

const requestSnap=
await getDoc(
requestRef
);

if(
!requestSnap.exists()
){

failed++;

log.textContent +=

`\n\n❌ Request tidak ditemukan

Rating Doc : ${ratingDoc.id}

requestId : ${ratingData.requestId}`;

continue;

}

const requestData=
requestSnap.data();

if(
!requestData.serviceId
){

failed++;

log.textContent +=

`\n\n❌ serviceId kosong

Request Doc : ${ratingData.requestId}`;

continue;

}

await updateDoc(

doc(
db,
"ratings",
ratingDoc.id
),

{

serviceId:
requestData.serviceId

}

);

success++;

log.textContent=

`Sedang migrasi...

Berhasil :
${success}

Gagal :
${failed}`;

}catch(error){

console.error(error);

failed++;

log.textContent +=

`\n\n❌ ${ratingDoc.id}

${error.message}`;

}

}

log.textContent=

`✅ Migrasi selesai

Berhasil :
${success}

Gagal :
${failed}

Rating lama sekarang sudah memiliki serviceId.`;

}catch(error){

console.error(error);

log.textContent=
error.message;

}

button.disabled=false;

};
