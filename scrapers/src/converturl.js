const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require('path');

class elxyz {
    converturl =
async function uploadwidipe(poto) {
    try {
      const mime = require('mime-types');
  const form = new FormData();
  const contentType = mime.lookup(poto);
  const fileName = path.basename(poto);
  form.append('file', fs.createReadStream(poto), {
    contentType: contentType || 'application/octet-stream',
    filename: fileName,
  });
      const response = await axios.post('https://cdn.elxyzgpt.xyz/', form, {
        headers: form.getHeaders(),
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            console.log(`🚀 Upload Progress: ${(progressEvent.loaded * 100) / progressEvent.total}%`);
          }
        }
      });
    const hasilnya = response.data.fileUrl
      console.log('🎉 File Upload Success:', response.data);
      return hasilnya;
    } catch (error) {
      console.error('🚫 Upload Failed:', error);
      return error
    }
}
}

module.exports = new elxyz()