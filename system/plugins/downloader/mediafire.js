const axios = require('axios')

let deku = async (m, {
    sock,
    client,
    conn,
    DekuGanz,
    Func,
    Scraper,
    text,
    config
}) => {
    if (!/www.mediafire.com/.test(text)) throw 'mana link MediaFire nya?'
    if (Func.isUrl(text)) {
        const mf = await axios.post('https://fgsi-mediafire.hf.space/', {
            url: text
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        m.reply(Object.entries(mf.data.data).map(([b, c]) => `> *- ${Func.Styles(`${b.capitalize()}`)} :* ${c}`).join("\n"))

        await sock.sendMessage(m.cht, {
            document: {
                url: mf.data.data.download
            },
            mimetype: mf.data.data.mimetype,
            fileName: mf.data.data.filename,
            caption: 'done'
        }, {
            quoted: m.fmeta
        })
    }
}

deku.command = "mediafire"
deku.alias = [
    "mfdl",
    "mf"
]
deku.category = [
    "downloader"
]
deku.settings = {
    limit: true
}
deku.description = "Mendownload Mediafire"
deku.loading = true

module.exports = deku
