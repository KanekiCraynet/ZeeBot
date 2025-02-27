const fetch = require("node-fetch");
const crypto = require("crypto");
const FormData = require("form-data");
const {
    fromBuffer
} = require("file-type");
const axios = require("axios");

module.exports = {
    command: "tourl",
    alias: ["touploader"],
    category: ["tools"],
    settings: {
        limit: true
    },
    description: "Mengconvert Media Ke Url",
    loading: true,
    async run(m, {
        text,
        Uploader,
        Func
    }) {

        switch (m.command) {
            case "tourl":
            case "touploader": {
                let target = m.quoted ? m.quoted : m;
                if (target.msg.mimetype) {
                    if (!target) throw "⚠️ *Oops!* Harap kirim atau balas media (gambar/video) yang ingin diubah menjadi tautan.";

                    let buffer = await target.download();
                    let caturl = await Uploader.catbox(buffer);
                    let btchurl = await api(buffer);

                    let caption = `✨ *Media to URL Uploader* ✨\n\n`
                    caption += `> 📂 *Ukuran media:* ${Func.formatSize(buffer.length)}\n`;
                    caption += `> 🔗 *Tautan hasil*\n`;
                    caption += `> 🔗 *Tautan 1:* ${caturl}\n`;
                    caption += `> 🔗 *Tautan 2:* ${btchurl}\n\n`
                    caption += `💡 *Tips:* Gunakan fitur ini untuk berbagi media dengan lebih mudah tanpa perlu mengunggah ulang.`;

                    m.reply(`${caption}`);
                } else {
                    if (!target) throw "⚠️ *Oops!* Bukan Media Gambar Foto/Video";
                }
            }
            break
        }
    }
}

const api = async (buffer) => {
    let {
        ext
    } = await fromBuffer(buffer);
    let bodyForm = new FormData();
    bodyForm.append("file", buffer, "file." + ext);
    let res = await fetch("https://file.btch.rf.gd/api/upload.php", {
        method: "post",
        body: bodyForm,
    });
    let data = await res.json();
    let resultUrl = data.result ? data.result.url : '';
    return resultUrl;
}
