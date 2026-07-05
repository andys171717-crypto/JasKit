export function convertTo16x9(file){

return new Promise((resolve,reject)=>{

if(!file){

reject(new Error("File tidak ditemukan."));

return;

}

const image = new Image();

const reader = new FileReader();

reader.onload = ()=>{

image.src = reader.result;

};

reader.onerror = ()=>{

reject(new Error("Gagal membaca gambar."));

};

image.onload = ()=>{

const TARGET_WIDTH = 1280;
const TARGET_HEIGHT = 720;

const canvas =
document.createElement("canvas");

canvas.width = TARGET_WIDTH;
canvas.height = TARGET_HEIGHT;

const ctx =
canvas.getContext("2d");

const targetRatio =
TARGET_WIDTH / TARGET_HEIGHT;

const imageRatio =
image.width / image.height;

let sx;
let sy;
let sw;
let sh;

if(imageRatio > targetRatio){

sh = image.height;
sw = sh * targetRatio;

sx = (image.width - sw) / 2;
sy = 0;

}else{

sw = image.width;
sh = sw / targetRatio;

sx = 0;
sy = (image.height - sh) / 2;

}

ctx.drawImage(

image,

sx,
sy,
sw,
sh,

0,
0,
TARGET_WIDTH,
TARGET_HEIGHT

);

canvas.toBlob(

(blob)=>{

resolve(

new File(

[blob],

file.name,

{

type:"image/jpeg"

}

)

);

},

"image/jpeg",

0.9

);

};

image.onerror = ()=>{

reject(

new Error(

"Gagal memuat gambar."

)

);

};

reader.readAsDataURL(file);

});

}
