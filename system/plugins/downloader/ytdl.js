const fs = require('fs');
const path = require('path');
const {
    v4: uuidv4
} = require('uuid');
const sytdl = require('s-ytdl')
const yts = require('yt-search')
const ytdl = require('ytdl-core')

let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {

    let capt = `\`[ Audio ]\` ${m.prefix + m.command} https://youtube.com/watch?v=dFi9L9C_-kw --mp3

\`[ Video ]\` ${m.prefix + m.command} https://youtube.com/watch?v=dFi9L9C_-kw --mp4

`

    if (!text.includes('youtube') || !text.includes('youtu')) return m.reply(capt)

    const videoId = await ytdl.getURLVideoID(text)
    let result = await yts({
        videoId: videoId,
        hl: 'id',
        gl: 'ID'
    })

    if (m.args[1] == "--mp3") {
        try {
            await Scraper.ytmp3cc(text, 'mp3').then(async (a) => {
                sock.sendMessage(m.cht, {
                    audio: {
                        url: a.link
                    },
                    mimetype: "audio/mpeg"
                }, {
                    quoted: m
                })
            })
            m.react('✅')
        } catch (err) {
            m.reply('error' + err)
        }
    } else if (m.args[1] == "--mp4") {
        let oi = ` =〆 ᴛɪᴛʟᴇ: ${result.title}\n`
        oi += ` =〆 ɪᴅ: ${result.videoId}\n`
        oi += ` =〆 ᴅᴜʀᴀsɪ: ${result.timestamp}\n`
        oi += ` =〆 ᴀɢᴏ: ${result.ago}\n`
        oi += ` =〆 ᴜʀʟ: ${result.url}`
        try {
            await Scraper.ytmp3cc(text, 'mp4').then(async (a) => {
                sock.sendMessage(m.cht, {
                    video: {
                        url: a.link
                    },
                    caption: oi
                }, {
                    quoted: m
                })
            })
        } catch (err) {
            m.reply('error' + err)
        }
        m.react('✅')
    } else {
        let lagi = `\`[ Audio ]\` ${m.prefix + m.command} https://youtube.com/watch?v=dFi9L9C_-kw --mp3

\`[ Video ]\` ${m.prefix + m.command} https://youtube.com/watch?v=dFi9L9C_-kw --mp4

`
        m.reply(lagi)
    }
}

deku.command = "yt-dl"
deku.alias = ["youtube-dl", "ytdl"]
deku.category = ["downloader"]
deku.settings = {
    limit: true
}
deku.description = "Mendownload Ytdl"
deku.loading = true

module.exports = deku
