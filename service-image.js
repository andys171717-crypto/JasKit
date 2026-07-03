import { uploadImage }
from "./upload-image.js";

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

preview.src =
URL.createObjectURL(file);

preview.style.display =
"block";

placeholder.style.display =
"none";

button.disabled = true;

button.textContent =
"Mengupload...";

try{

uploadedImageUrl =
await uploadImage(file);

button.textContent =
"Ganti Foto";

}
catch(err){

alert(err.message);

preview.style.display =
"none";

placeholder.style.display =
"block";

uploadedImageUrl = "";

button.textContent =
"Pilih Foto";

}
finally{

button.disabled = false;

}

});

}
