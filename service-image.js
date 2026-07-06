import { uploadImage }
from "./upload-image.js";

import { convertTo16x9 }
from "./service-image-resize.js";

let uploadedImageUrl = "";

const IMAGE_DRAFT_KEY =
"jaskit_service_image";

export function getServiceImageUrl(){

return uploadedImageUrl;

}

function saveImageDraft(){

sessionStorage.setItem(

IMAGE_DRAFT_KEY,

uploadedImageUrl

);

}

function loadImageDraft(){

return sessionStorage.getItem(

IMAGE_DRAFT_KEY

) || "";

}

function clearImageDraft(){

sessionStorage.removeItem(

IMAGE_DRAFT_KEY

);

}

export function initServiceImage(){

const input =
document.getElementById(
"serviceImageInput"
);

const preview =
document.getElementById(
"servicePreview"
);

const placeholder =
document.getElementById(
"servicePlaceholder"
);

const button =
document.getElementById(
"btnPilihFoto"
);

const btnHapus =
document.getElementById(
"btnHapusFoto"
);

const savedImage =
loadImageDraft();

if(savedImage){

uploadedImageUrl =
savedImage;

preview.src =
savedImage;

preview.style.display =
"block";

placeholder.style.display =
"none";

button.style.display =
"none";

btnHapus.style.display =
"flex";

preview.style.cursor =
"pointer";

preview.onclick =
()=>{

input.click();

};

}

button.addEventListener(
"click",
()=>{

input.click();

}
);

input.addEventListener(
"change",
async()=>{

const file =
input.files[0];

if(!file) return;

const resizedFile =
await convertTo16x9(file);

uploadedImageUrl =
await uploadImage(resizedFile);

saveImageDraft();

preview.src =
URL.createObjectURL(resizedFile);

preview.style.cursor =
"pointer";

preview.onclick =
()=>{

input.click();

};

preview.style.display =
"block";

placeholder.style.display =
"none";

button.style.display =
"none";

btnHapus.style.display =
"flex";

});

btnHapus.addEventListener(
"click",
()=>{

uploadedImageUrl = "";

clearImageDraft();

input.value = "";

preview.src = "";

preview.onclick = null;

preview.style.cursor =
"default";

preview.style.display =
"none";

placeholder.style.display =
"flex";

button.style.display =
"block";

btnHapus.style.display =
"none";

});

}

