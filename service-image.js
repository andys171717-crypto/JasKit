import { uploadImage }
from "./upload-image.js";

import {
openCropper
}
from "./image-cropper.js";

let uploadedImageUrl = "";

export function getServiceImageUrl(){

return uploadedImageUrl;

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

openCropper(

file,

async(blob)=>{

uploadedImageUrl =
await uploadImage(blob);

preview.src =
URL.createObjectURL(blob);

preview.style.display =
"block";

placeholder.style.display =
"none";

button.style.display =
"none";

btnHapus.style.display =
"flex";

}

);

return;

});

}

