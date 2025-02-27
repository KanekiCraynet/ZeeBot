const yts = require("yt-search");
const ytdl = require('ytdl-core')
const axios = require('axios')
const fs = require('node:fs')

class Command {
    constructor() {
        this.command = "ytmp3"
        this.alias = [
            "yta",
            "yt-audio"
        ]
        this.category = [
            "downloader"
        ]
        this.settings = {
            limit: true
        }
        this.description = "Mendownload YouTube Audio"
        this.loading = true
    }
    run = async (m, {
        sock,
        client,
        conn,
        DekuGanz,
        Func,
        Scraper,
        text,
        config
    }) => {

        if (!text.includes('youtu')) throw `Link Contoh ${m.prefix + m.command} <link>`;
        const videoId = await ytdl.getURLVideoID(text)
        if (!videoId) return m.reply(Func.Styles('Maaf VideoId nya ga valid'))
        let result = await yts({
            videoId: videoId,
            hl: 'id',
            gl: 'ID'
        })

        let hah = result.url;
        let deku = Func.Styles(`⏤͟͟͞͞╳── *[ yta - download ]* ── .々─ᯤ\n`)
        deku += `│    =〆 ᴛɪᴛʟᴇ: ${result.title}\n`
        deku += `│    =〆 ɪᴅ: ${result.videoId}\n`
        deku += `│    =〆 ᴅᴜʀᴀsɪ: ${result.timestamp}\n`
        deku += `│    =〆 ᴀɢᴏ: ${result.ago}\n`
        deku += `│    =〆 ᴅᴇsᴄʀɪᴘᴛɪᴏɴ: ${result.description}\n`
        deku += `│    =〆 ᴜʀʟ: ${result.url}\n`
        deku += `⏤͟͟͞͞╳────────── .✦`

        await sock.sendMessage(m.cht, {
            text: deku,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: result.title,
                    mediaType: 1,
                    previewType: 1,
                    body: `Durasi : ${result.timestamp} / View : ${result.views}`,
                    thumbnailUrl: result.image,
                    renderLargerThumbnail: true,
                    mediaUrl: result.url,
                    sourceUrl: result.url
                }
            }
        }, {
            quoted: m
        })

        try {
            const distu = await Scraper.distubeyt(text, "mp3")

            await sock.sendMessage(m.cht, {
                audio: distu.getaudio,
                mimetype: 'audio/mpeg'
            }, {
                quoted: m
            })
        } catch (err) {
            try {
                const {
                    link
                } = await Scraper.ytmp3cc(text, 'mp3')
                await sock.sendMessage(m.cht, {
                    audio: {
                        url: link
                    },
                    mimetype: 'audio/mpeg'
                }, {
                    quoted: m
                })
            } catch (err) {
                try {
                    const {
                        downloadUrl
                    } = await Scraper.ddownr.download(text, 'mp3')
                    await sock.sendMessage(m.cht, {
                        audio: {
                            url: downloadUrl
                        },
                        mimetype: 'audio/mpeg'
                    }, {
                        quoted: m
                    })
                } catch (err) {
                    m.reply('error' + err)
                }
            }
        };
        m.react('✅')
    }
}

module.exports = new Command();
