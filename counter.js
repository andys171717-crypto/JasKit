import {
getFirestore,
doc,
getDoc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const db = getFirestore();

async function getNextNumber(counterName){

const counterRef =
doc(
db,
"counters",
counterName
);

const counterSnap =
await getDoc(counterRef);

if(!counterSnap.exists()){

throw new Error(
"Counter tidak ditemukan: "
+ counterName
);

}

const currentValue =
counterSnap.data().value || 0;

const nextValue =
currentValue + 1;

await updateDoc(
counterRef,
{
value: nextValue
}
);

return nextValue;

}

export async function generateProviderCode(){

const number =
await getNextNumber(
"providerCounter"
);

return `JKM${String(number)
.padStart(4,"0")}`;

}

export async function generateRequestCode(){

const number =
await getNextNumber(
"requestCounter"
);

const today =
new Date();

const yy =
String(
today.getFullYear()
).slice(-2);

const mm =
String(
today.getMonth()+1
).padStart(2,"0");

const dd =
String(
today.getDate()
).padStart(2,"0");

return `JKR${yy}${mm}${dd}${String(number)
.padStart(4,"0")}`;

}

export async function generateOrderCode(){

const number =
await getNextNumber(
"orderCounter"
);

const today =
new Date();

const yy =
String(
today.getFullYear()
).slice(-2);

const mm =
String(
today.getMonth()+1
).padStart(2,"0");

const dd =
String(
today.getDate()
).padStart(2,"0");

return `JKO${yy}${mm}${dd}${String(number)
.padStart(4,"0")}`;

}

export async function generatePaymentCode(){

const number =
await getNextNumber(
"paymentCounter"
);

const today =
new Date();

const yy =
String(
today.getFullYear()
).slice(-2);

const mm =
String(
today.getMonth()+1
).padStart(2,"0");

const dd =
String(
today.getDate()
).padStart(2,"0");

return `JKP${yy}${mm}${dd}${String(number)
.padStart(4,"0")}`;

}

