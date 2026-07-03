const IMGBB_API_KEY =
"c2e3fcd3251f6d46da391b73e5113cda";

/**
 * Upload gambar ke ImgBB
 * @param {File} file
 * @returns {Promise<string>} URL gambar
 */
export async function uploadImage(file){

if(!file){
throw new Error("File tidak ditemukan.");
}

if(!file.type.startsWith("image/")){
throw new Error("File harus berupa gambar.");
}

const MAX_SIZE =
5 * 1024 * 1024;

if(file.size > MAX_SIZE){
throw new Error(
"Ukuran gambar maksimal 5 MB."
);
}

const formData =
new FormData();

formData.append(
"image",
file
);

const response =
await fetch(
`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
{
method:"POST",
body:formData
}
);

if(!response.ok){
throw new Error(
"Gagal terhubung ke ImgBB."
);
}

const result =
await response.json();

if(
!result.success ||
!result.data?.url
){
throw new Error(
"Upload gambar gagal."
);
}

return result.data.url;

}
