const fs = require('node:fs')
const pkg = require(process.cwd() + "/package.json")

module.exports = {
    command: "script",
    alias: ["sc", "scbot"],
    category: ["info"],
    description: "Dapatkan Script bot secara gratis",
    async run(m, {
        sock,
        client,
        Func,
        config
    }) {

        let tekssc = Func.Styles(`⏤͟͟͞͞╳── *[ sᴄ ${config.name} ${pkg.version} ]* ── .々─ᯤ
│    =〆 ᴄᴀsᴇ x ᴘʟᴜɢɪɴ
│    =〆 ʙᴀsᴇ ᴀxᴇʟ-ɴᴇᴛᴡᴏʀᴋ
│    =〆 ғɪᴛᴜʀ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ᴀᴅᴀ
│    =〆 ғɪᴛᴜʀ sᴇᴀʀᴄʜ ᴀᴅᴀ
│    =〆 ғɪᴛᴜʀ ᴀɴɪᴍᴇ ᴀᴅᴀ
│    =〆 ᴅʟʟ ᴀᴅᴀ
│    =〆 ʀᴇᴍᴀᴋᴇ: ᴅᴇᴋᴜɢᴀɴᴢ
│    =〆 Script:\n`)
        tekssc += `│    =〆 https://github.com/LeooxzyDekuu/HanakoBotz
│    =〆 ᴄʜ:
│    =〆 https://whatsapp.com/channel/0029VadFS3r89inc7Jjus03W
⏤͟͟͞͞╳────────── .✦`

        m.reply({
            location: {
                degreesLatitude: 0,
                degreesLongitude: 0,
                name: Func.Styles(`${config.name}`),
                address: Func.Styles(`© ${config.name} 2021 - 2024`),
                isLive: true,
                jpegThumbnail: await sock.resize(fs.readFileSync('./image/Hanako-replydoc.jpg'), 300, 170)
            },
            caption: "",
            footer: config.name,
            title: tekssc,
            subtitle: "",
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: !0,
                forwardingScore: 127,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: config.saluran,
                    newsletterName: config.name,
                    serverMessageId: -1
                }
            },
            interactiveButtons: [{
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: Func.Styles("Link Script 📙"),
                    url: "https://github.com/LeooxzyDekuu/HanakoBotz",
                    merchant_url: "https://github.com/LeooxzyDekuu/HanakoBotz"
                })
            }]
        })
    },
};
