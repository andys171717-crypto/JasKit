let cropper = null;

let cropCallback = null;

const modal =
document.getElementById(
"cropperModal"
);

const image =
document.getElementById(
"cropperImage"
);

const btnClose =
document.getElementById(
"btnCloseCropper"
);

const btnBatal =
document.getElementById(
"btnCropBatal"
);

export function initImageCropper(){

btnClose.onclick =
closeCropper;

btnBatal.onclick =
closeCropper;

const btnSimpan =
document.getElementById(
"btnCropSimpan"
);

btnSimpan.onclick =
async()=>{

const blob =
await getCroppedBlob();

if(typeof cropCallback === "function"){

await cropCallback(blob);

}

closeCropper();

};

}

export function openCropper(
file,
callback
){

cropCallback =
callback;

modal.style.display =
"flex";

const objectUrl =
URL.createObjectURL(file);

image.src =
objectUrl;

image.onload =
()=>{

if(cropper){

cropper.destroy();

}

try{

console.log("typeof Cropper =", typeof Cropper);  

cropper =
new Cropper(
image,
{

aspectRatio:16/9,

viewMode:1,

dragMode:"move",

autoCropArea:1,

responsive:true,

background:false,

movable:true,

zoomable:true,

scalable:false,

rotatable:false

}

);

console.log("Cropper berhasil dibuat", cropper);

}catch(error){

console.error("Cropper gagal dibuat:", error);

}


};

}

function closeCropper(){

modal.style.display =
"none";

if(cropper){

cropper.destroy();

cropper = null;

}

}

export function getCroppedBlob(){

return new Promise((resolve)=>{

const canvas =
cropper.getCroppedCanvas({

width:1280,

height:720

});

canvas.toBlob(

(blob)=>{

resolve(blob);

},

"image/jpeg",

0.9

);

});

}
