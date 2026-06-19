import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
getFirestore,
doc,
getDoc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

import {
getAuth,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

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

const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");

const container =
document.getElementById("orderDetail");

onAuthStateChanged(
auth,
(user)=>{

if(!user){

window.location.href =
"index.html";

return;

}

if(!orderId){

container.innerHTML =
"<h3>Order ID tidak ditemukan</h3>";

return;

}

loadOrder();

}
);

async function loadOrder(){

try{

const orderRef =
doc(db,"orders",orderId);

const orderSnap =
await getDoc(orderRef);

if(!orderSnap.exists()){

container.innerHTML = `
<h3>Pesanan tidak ditemukan</h3>
`;

return;

}

document.addEventListener(
"click",
async(e)=>{

if(
!e.target.classList.contains(
"progress-btn"
)
){
return;
}

const progress =
e.target.dataset.progress;

const steps = [
"Berangkat",
"Tiba Lokasi",
"Sedang Dikerjakan",
"Selesai"
];

const currentProgress =
data.progress || "";

const currentIndex =
steps.indexOf(currentProgress);

const nextIndex =
steps.indexOf(progress);

if(nextIndex > currentIndex + 1){

alert(
"Selesaikan tahap sebelumnya terlebih dahulu"
);

return;
}

try{

if(
progress==="Selesai"
){

await updateDoc(
doc(
db,
"orders",
orderId
),
{
status:"Selesai",
progress:"Selesai"
}
);

}else{

await updateDoc(
doc(
db,
"orders",
orderId
),
{
progress:progress
}
);

}

alert(
"Progress diperbarui: "
+ progress
);

location.reload();

}catch(error){

console.error(error);

alert(
"Gagal update progress"
);

}

}
);

const data =
orderSnap.data();

container.innerHTML = `

<div class="order-card">

<h2>${data.namaJasa}</h2>

<div class="status-badge">
🟡 ${data.status}
</div>

<hr>

<div class="info-row">
👤 Customer: ${data.nama}
</div>

<div class="info-row">
📞 HP: ${data.hp}
</div>

<div class="info-row">
📍 Alamat: ${data.alamat}
</div>

<div class="info-row">
🔧 Keluhan: ${data.keluhan}
</div>

</div>

`;

}catch(error){

console.error(error);

container.innerHTML = `
<h3>Gagal memuat data pesanan</h3>
<p>${error.message}</p>
`;

}

}
