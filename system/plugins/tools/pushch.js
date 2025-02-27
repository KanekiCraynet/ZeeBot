const ya = require("js-beautify")
const {
    writeExif,
    videoToWebp
} = require(process.cwd() + "/lib/sticker");

let yukio = async (m, {
    sock,
    client,
    conn,
    DekuGanz,
    Func,
    Scraper,
    text,
    config
}) => {
    let quoted = m.quoted ? m.quoted : m;
    let pp = await sock.profilePictureUrl(m.sender, 'image')

    let captions = quoted.text || "requires chat: ?"

    if (/audio/.test(quoted.msg.mimetype)) {
        await sock.sendMessage(config.saluran, {
            audio: await quoted.download(),
            mimetype: 'audio/mpeg',
            ptt: true,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: !0,
                forwardingScore: 127,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: config.saluran,
                    newsletterName: `ᴘᴜsʜᴄʜ | ` + config.name,
                    serverMessageId: -1
                },
                externalAdReply: {
                    title: `Pushch Oleh: ${m.pushName}`,
                    body: `${config.ownername2} | ` + config.name,
                    mediaType: 1,
                    thumbnailUrl: pp,
                    sourceUrl: "https://www.tiktok.com/@leooxzy_ganz/",
                }
            }
        })
    } else if (/video/.test(quoted.msg.mimetype)) {
        await sock.sendMessage(config.saluran, {
            video: await quoted.download(),
            caption: captions,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: !0,
                forwardingScore: 127,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: config.saluran,
                    newsletterName: `ᴘᴜsʜᴄʜ | ` + config.name,
                    serverMessageId: -1
                }
            }
        })
    } else if (/image/.test(quoted.msg.mimetype)) {
        await sock.sendMessage(config.saluran, {
            image: await quoted.download(),
            caption: captions,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: !0,
                forwardingScore: 127,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: config.saluran,
                    newsletterName: `ᴘᴜsʜᴄʜ | ` + config.name,
                    serverMessageId: -1
                },
                externalAdReply: {
                    title: `Pushch Oleh: ${m.pushName}`,
                    body: `${config.ownername2} | ` + config.name,
                    mediaType: 1,
                    thumbnailUrl: pp,
                    sourceUrl: "https://www.tiktok.com/@leooxzy_ganz/",
                }
            }
        })
    } else if (/sticker/.test(quoted.msg.mimetype)) {
        let stickerte = await writeExif({
            mimetype: await q.msg.mimetype,
            data: await quoted.download(),
        }, {
            packName: config.sticker.packname,
            packPublish: config.sticker.author,
        }, );
        await sock.sendMessage(config.saluran, {
            sticker: stickerte,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: !0,
                forwardingScore: 127,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: config.saluran,
                    newsletterName: `ᴘᴜsʜᴄʜ | ` + config.name,
                    serverMessageId: -1
                },
                externalAdReply: {
                    title: `Pushch Oleh: ${m.pushName}`,
                    body: `${config.ownername2} | ` + config.name,
                    mediaType: 1,
                    thumbnailUrl: pp,
                    sourceUrl: "https://www.tiktok.com/@leooxzy_ganz/",
                }
            }
        })
    } else if (captions) {
        await sock.sendMessage(config.saluran, {
            text: captions,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: !0,
                forwardingScore: 127,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: config.saluran,
                    newsletterName: `ᴘᴜsʜᴄʜ | ` + config.name,
                    serverMessageId: -1
                },
                externalAdReply: {
                    title: `Pushch Oleh: ${m.pushName}`,
                    body: `${config.ownername2} | ` + config.name,
                    mediaType: 1,
                    thumbnailUrl: pp,
                    sourceUrl: "https://www.tiktok.com/@leooxzy_ganz/",
                }
            }
        })
    } else m.reply('maaf anda bisa kirim audio, video, image, teks aja yg lain gabisa😂')
}

yukio.command = "pushch"
yukio.alias = ["pshch", "psch"]
yukio.category = ["tools"]

yukio.settings = {
    owner: true
}
yukio.loading = true

module.exports = yukio
