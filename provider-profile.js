import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
getAuth,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import {
getFirestore,
doc,
getDoc,
collection,
getDocs
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyCnk56ZY63q2h1ewEdiivzB0rrSfJOJtYo",

authDomain: "jasaku-92b55.firebaseapp.com",

projectId: "jasaku-92b55",

storageBucket: "jasaku-92b55.firebasestorage.app",

messagingSenderId: "217601622524",

appId: "1:217601622524:web:e3bc48dbdc50d7cb10b279"

};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

const db =
getFirestore(app);

onAuthStateChanged(
auth,
async(user)=>{

if(!user){

window.location.href =
"akun.html";

return;

}

const snap =
await getDoc(
doc(
db,
"users",
user.uid
)
);

if(!snap.exists()) return;

const data =
snap.data();

document.getElementById(
"businessName"
).innerText =
data.businessName ||
"Nama Usaha";

document.getElementById(
"businessPhone"
).innerText =
data.phone ||
"-";

document.getElementById(
"businessLocation"
).innerText =
(
data.city || "-"
)
+
", "
+
(
data.province || "-"
);

document.getElementById(
"businessDescription"
).innerText =
data.description ||
"-";

const initials =
(
data.businessName ||
"U"
)
.charAt(0)
.toUpperCase();

document.getElementById(
"businessAvatar"
).innerText =
initials;

/* ===========================
   RATING MITRA
=========================== */

document.getElementById(
"providerRating"
).innerText =
(
data.ratingAverage || 0
).toFixed(1);

document.getElementById(
"providerReviewCount"
).innerText =
data.ratingCount || 0;

const reviewContainer =
document.getElementById(
"reviewList"
);

reviewContainer.innerHTML = "";

const reviewSnap =
await getDocs(

collection(
db,
"users",
user.uid,
"reviews"
)

);

if(reviewSnap.empty){

reviewContainer.innerHTML=`

<div class="review-empty">

Belum ada ulasan.

</div>

`;

}else{

reviewSnap.forEach(doc=>{

const review=
doc.data();

let stars="";

for(
let i=1;
i<=5;
i++
){

stars +=
i<=review.rating
?
"★"
:
"☆";

}

reviewContainer.innerHTML+=`

<div class="review-card">

<div class="review-stars">

${stars}

</div>

<div class="review-text">

${
review.review
||
"Customer tidak menulis ulasan."
}

</div>

</div>

`;

});

}

}
);

