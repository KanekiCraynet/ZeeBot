const {
    writeExif
} = require(process.cwd() + "/lib/sticker");

async function events(m, {
    sock,
    Func,
    Scraper,
    config,
    store
}) {
    if (m.body === "90+6=" || m.body === "90 + 6 =" || m.body === "langit" || m.body === "90 6") {
        let media = await sock.getBuffer("https://files.catbox.moe/vq4otb.webp")
        let sticker = await writeExif({
            mimetype: "image",
            data: media,
        }, {
            packName: config.sticker.packname,
            packPublish: config.sticker.author,
        });
        await m.reply({
            sticker
        });
    }
}

module.exports = {
    events
}
