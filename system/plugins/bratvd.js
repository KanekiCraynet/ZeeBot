const {
    writeExif
} = require(process.cwd() + "/lib/sticker");
const {
    execSync
} = require("child_process");
const fs = require("fs");
const path = require("path");
const axios = require('axios');

let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {
    if (!text) return m.reply("> Reply/Masukan pessn");
    m.reply(config.messages.wait);
    let media = await axios.get(`https://brat.caliphdev.com/api/brat/animate?text=${text}`, {
        responseType: 'arraybuffer'
    }).then(a => a.data);
    let sticker = await writeExif({
        mimetype: "video",
        data: media,
    }, {
        packName: config.sticker.packname,
        packPublish: config.sticker.author,
    });
    await m.reply({
        sticker
    });
}

deku.command = "bratvid"
deku.alias = []
deku.category = ["main"]
deku.settings = {
    limit: true
}
deku.description = "sticker bratvid"
deku.loading = true

module.exports = deku