const yts = require('yt-search')

class Command {
    constructor() {
        this.command = "yts"
        this.alias = ["yt-search", "searchyt"]
        this.category = ["search"]
        this.settings = {
            limit: true
        }
        this.description = "Mengsearch Yt"
        this.loading = true
    }
    run = async (m, {
        sock,
        Func,
        Scraper,
        config,
        store,
        text
    }) => {

        if (!text) throw 'cari nama yang pengen search contoh .ytsearch opening brutal legends fase 4'

        const result = await yts.search(text)

        if (result === 0) {
            m.reply('maaf yang anda search gada silahkan coba lagi....')
        }

        let no = 1
        let capyt = `⏤͟͟͞͞╳── *[ sᴇᴀʀᴄʜ ʏᴛ ]* ── .々─ᯤ\n\n`
        for (let i of result.all) {
            capyt += `⏤͟͟͞͞╳── *[ ${no++} ]* ── .々─ᯤ\n`
            capyt += `│    =〆 ᴛɪᴛʟᴇ: ${i.title}\n`
            capyt += `│    =〆 ɪᴅ: ${i.videoId}\n`
            capyt += `│    =〆 ᴀɢᴏ: ${i.ago}\n`
            capyt += `│    =〆 ᴅᴇsᴄ: ${i.description}\n`
            capyt += `│    =〆 ᴛɪᴍᴇsᴛᴀᴍᴘ: ${i.timestamp}\n`
            capyt += `│    =〆 ᴠɪᴇᴡ: ${i.views}\n`
            capyt += `│    =〆 ᴜʀʟ: ${i.url}\n`
            capyt += `⏤͟͟͞͞╳────────── .✦\n\n`
        }
        capyt += `⏤͟͟͞͞╳────────── .✦`

        sock.sendButtonMessage(m.cht, [{
            type: 'list',
            title: 'Click Here',
            value: [{
                rows: result.all.map((a, i) => ({
                    title: `${i + 1} ${a.title}`,
                    command: `${m.prefix}play ${a.url}`,
                    body: `${a.url}`
                }))
            }]
        }], m, {
            url: result.all[0].thumbnail,
            body: capyt,
            footer: config.ownername
        })
    }
}

module.exports = new Command();