import { uploadImage }
from "./upload-image.js";

import { convertTo16x9 }
from "./service-image-resize.js";

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

const resizedFile =
await convertTo16x9(file);

uploadedImageUrl =
await uploadImage(resizedFile);

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

