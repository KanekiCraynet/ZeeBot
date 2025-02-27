const yts = require('yt-search')
const ytdl = require('@distube/ytdl-core')

class Command {
    constructor() {
        this.command = "play"
        this.alias = []
        this.category = ["downloader"]
        this.settings = {}
        this.description = "Mengsearch/Link Video/Music Dari Yt"
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
        if (!text) throw `\`[ Contoh ]\` ${m.prefix + m.command} Opening Boku no Hero academia`
        if (/youtube.com/.test(text)) {
            const id = await ytdl.getVideoID(text)
            let result = await yts({
                videoId: id,
                hl: 'id',
                gl: 'ID'
            })
            if (result === 0) {
                m.reply('maaf ga dapat di convert...')
            }
            let deku = `⏤͟͟͞͞╳── *[ ᴘʟᴀʏ - ʏᴏᴜᴛᴜʙᴇ ]* ── .々─ᯤ\n`
            deku += `│    =〆 ᴛɪᴛʟᴇ: ${result.title}\n`
            deku += `│    =〆 ɪᴅ: ${result.videoId}\n`
            deku += `│    =〆 ᴅᴜʀᴀsɪ: ${result.timestamp}\n`
            deku += `│    =〆 ᴀɢᴏ: ${result.ago}\n`
            deku += `│    =〆 ᴅᴇsᴄʀɪᴘᴛɪᴏɴ: ${result.description}\n`
            deku += `│    =〆 ᴜʀʟ: ${result.url}\n`
            deku += `⏤͟͟͞͞╳────────── .✦`
            await m.reply({
                image: {
                    url: result.thumbnail
                },
                caption: deku,
                footer: config.ownername,
                viewOnce: true,
                headerType: 6,
                buttons: [{
                    buttonId: `.ytmp4 ${result.url}`,
                    buttonText: {
                        displayText: 'Video'
                    }
                }, {
                    buttonId: `.ytmp3 ${result.url}`,
                    buttonText: {
                        displayText: "Audio"
                    }
                }]
            })
        } else {
            let convert = await yts({
                search: text,
                hl: 'id',
                gl: 'ID'
            })
            let result = convert.all[0]

            if (result === 0) {
                m.reply('maaf ga ketemu...')
            }

            let hah = result.url;
            let deku = `⏤͟͟͞͞╳── *[ ᴘʟᴀʏ - ʏᴏᴜᴛᴜʙᴇ ]* ── .々─ᯤ\n`
            deku += `│    =〆 ᴛɪᴛʟᴇ: ${result.title}\n`
            deku += `│    =〆 ɪᴅ: ${result.videoId}\n`
            deku += `│    =〆 ᴅᴜʀᴀsɪ: ${result.timestamp}\n`
            deku += `│    =〆 ᴀɢᴏ: ${result.ago}\n`
            deku += `│    =〆 ᴅᴇsᴄʀɪᴘᴛɪᴏɴ: ${result.description}\n`
            deku += `│    =〆 ᴜʀʟ: ${result.url}\n`
            deku += `⏤͟͟͞͞╳────────── .✦`
            await m.reply({
                image: {
                    url: result.thumbnail
                },
                caption: deku,
                footer: config.ownername,
                viewOnce: true,
                headerType: 6,
                buttons: [{
                    buttonId: `.ytmp4 ${result.url}`,
                    buttonText: {
                        displayText: 'Video'
                    }
                }, {
                    buttonId: `.ytmp3 ${result.url}`,
                    buttonText: {
                        displayText: "Audio"
                    }
                }]
            })
        }
    }
}

module.exports = new Command();