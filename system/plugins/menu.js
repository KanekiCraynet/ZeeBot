const moment = require("moment-timezone");
const axios = require('axios');
const fs = require('node:fs')
const path = require("node:path");
const process = require('process');
const {
    exec,
    spawn,
    execSync
} = require('child_process');
const child_process = require('child_process');
const os = require('os');
const speed = require('performance-now');
const osu = require('node-os-utils');
const pkg = require(process.cwd() + "/package.json")

let deku = async (m, {
    sock,
    Func,
    Scraper,
    plugins,
    Uploader,
    store,
    text,
    config
}) => {
    const more = String.fromCharCode(8206);
    const readmore = more.repeat(4001);
    let platform = os.platform()
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let date = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jakarta'
    })
    let runtime = speed()
    let totalreg = Object.keys(db.list().user).length
    let data = fs.readFileSync(process.cwd() + "/system/case.js", "utf8");
    let casePattern = /case\s+"([^"]+)"/g;
    let matches = data.match(casePattern);
    if (!matches) return m.reply("Tidak ada case yang ditemukan.");
    matches = matches.map((match) => match.replace(/case\s+"([^"]+)"/, "$1"));
    let menu = {};
    plugins.forEach((item) => {
        if (item.category && item.command && item.alias) {
            item.category.forEach((cat) => {
                if (!menu[cat]) {
                    menu[cat] = {
                        command: [],
                    };
                }
                menu[cat].command.push({
                    name: item.command,
                    alias: item.alias,
                    description: item.description,
                    settings: item.settings,
                });
            });
        }
    });
    let cmd = 0;
    let alias = 0;
    let pp = await sock
        .profilePictureUrl(m.sender, "image")
        .catch((e) => "https://files.catbox.moe/8getyg.jpg");
    Object.values(menu).forEach((category) => {
        cmd += category.command.length;
        category.command.forEach((command) => {
            alias += command.alias.length;
        });
    });

    if (Object.keys(menu).find((a) => a === text.toLowerCase())) {
        let list = menu[Object.keys(menu).find((a) => a === text.toLowerCase())];
        let caption = Func.Styles(`ʜɪ ${m.pushName} , ɪ ᴀᴍ ᴀɴ ᴀᴜᴛᴏᴍᴀᴛᴇᴅ sʏsᴛᴇᴍ ( ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ )${readmore}. ᴛʜᴀᴛ ᴄᴀɴ ʜᴇʟᴘ ᴛᴏ ᴅᴏ sᴏᴍᴇᴛʜɪɴɢ sᴇᴀʀᴄʜ ᴀɴᴅ get ᴅᴀᴛᴀ ᴏʀ ɪɴғᴏʀᴍᴀᴛɪᴏɴ ᴏɴʟʏ ᴛʜʀᴏᴜɢʜ ᴡʜᴀᴛsᴀᴘᴘ, 

⏤͟͟͞͞╳── *[ ɪɴғᴏ - ᴜsᴇʀ ]* ── .々─ᯤ
│    =〆 ɴᴀᴍᴇ: ${m.pushName}
│    =〆 ɴᴏᴍᴏʀ: ${m.sender.split('@')[0]}
│    =〆 ʟɪᴍɪᴛ: ${db.list().user[m.sender].limit}
⏤͟͟͞͞╳────────── .✦
│
⏤͟͟͞͞╳── *[ ʙᴏᴛ - ɪɴғᴏ ]* ── .々─ᯤ
│    =〆 ʀᴜɴᴛɪᴍᴇ: ${runtime}
│    =〆 ᴛʏᴘᴇ: ᴄᴀsᴇ x ᴘʟᴜɢɪɴ
│    =〆 ᴜsᴇʀ: ${totalreg}
│    =〆 ᴍᴏᴅᴇ: ${db.list().settings.self ? 'sᴇʟғ' : `ᴘᴜʙʟɪᴄ`}
│    =〆 version: ${pkg.version}
│    =〆 ᴘʀᴇғɪx: ${m.prefix}
│    =〆 ᴅᴀᴛᴇ: ${date}
⏤͟͟͞͞╳────────── .✦
│
⏤͟͟͞͞╳── *[ Menu – ${text.toUpperCase()} ]* ── .々─ᯤ
${list.command
  .map(
    (a, i) =>
      `│    =〆 ${m.prefix + a.name} ${a.settings?.premium ? "🥇" : a.settings?.limit ? "🥈" : ""}`,
  )
  .join("\n")}
⏤͟͟͞͞╳────────── .✦
`);


        m.reply({
            video: {
                url: "https://files.catbox.moe/f1l5ij.mp4"
            },
            caption: caption,
            gifPlayback: true,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: !0,
                forwardingScore: 127,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: config.saluran,
                    newsletterName: `${config.name} | ` + date,
                    serverMessageId: -1
                },
                externalAdReply: {
                    title: `々 ${config.ownername2} | ${config.name}`,
                    body: `${config.ownername2} | ` + date,
                    mediaType: 1,
                    thumbnail: fs.readFileSync('./image/DekuThumb.jpg'),
                    renderLargerThumbnail: false,
                    sourceUrl: "https://www.tiktok.com/@leooxzy_ganz/",
                }
            }
        })
    } else {
        let list = Object.keys(menu);
        const xmenu_oh = `hai ${m.pushName} saya ${config.name} dan saya adalah bot wa di buat oleh deku

⏤͟͟͞͞╳─ \`[ ɪɴғᴏ - ᴜsᴇʀ ]\` ── .々─ᯤ
> ɴᴀᴍᴇ: ${m.pushName}
> ɴᴏᴍᴏʀ: ${m.sender.split('@')[0]}
> ʟɪᴍɪᴛ: ${db.list().user[m.sender].limit}

⏤͟͟͞͞╳─ \`[ informasi - bot ]\` ── .々─ᯤ
> ᴜsᴇʀ: ${totalreg}
> ᴍᴏᴅᴇ: ${db.list().settings.self ? 'sᴇʟғ' : `ᴘᴜʙʟɪᴄ`}
> version: ${pkg.version}
> ᴘʀᴇғɪx: ${m.prefix}
> ᴅᴀᴛᴇ: ${date}
${readmore}
⏤͟͟͞͞╳── \`[ ᴘᴇɴᴛᴜɴᴊᴜᴋ ]\` ── .々─ᯤ
│    =〆 ${m.prefix}allmenu
${list.map((a) => `│    =〆 ${m.prefix + m.command} ${a}`).join("\n")}
⏤͟͟͞͞╳────────── .✦

Kalau Error Bisa Hubungi Ke .owner gass`


        let sections = [{
                title: '<!> Informasi Bot',
                rows: [{
                        title: 'Script🗒️',
                        description: `Menampilkan pesan Script`,
                        id: `${m.prefix}sc`
                    },
                    {
                        title: 'tqto👤',
                        description: `Menampilkan pesan thank you to`,
                        id: `${m.prefix}ping`
                    },
                    {
                        title: 'Creator 👑',
                        description: `Menampilkan pesan thank you to`,
                        id: `${m.prefix}owner`
                    },
                    {
                        title: 'AllMenu📘',
                        description: `Menampilkan pesan allmenu`,
                        id: `${m.prefix}allmenu`
                    },
                ]
            },
            {
                title: '< ! > Ai',
                rows: [{
                        title: 'Ai Yuta',
                        description: `Ai Yuta Dari Anime: Jujutsu kaisen`,
                        id: `${m.prefix}Yuta halo`
                    },
                    {
                        title: 'Ai Bakugo',
                        description: `Ai Bakugo Dari: Anime My Hero Academia`,
                        id: `${m.prefix}bakugo halo`
                    },
                    {
                        title: 'Ai Deku',
                        description: `Ai Deku Dari: Anime My Hero Academia`,
                        id: `${m.prefix}deku halo`
                    },
                    {
                        title: 'Ai Denki',
                        description: `Ai Denki Dari: Anime My Hero Academia`,
                        id: `${m.prefix}denki halo`
                    },
                    {
                        title: 'Ai Todoroki',
                        description: `Ai Todoroki Dari: Anime My Hero Academia`,
                        id: `${m.prefix}todoroki halo`
                    },
                ]
            },
            {
                title: '< ! > Pentunjuk',
                rows: list.map((a) => ({
                    title: `${m.command} ${a}`,
                    description: `Menampilkan pesan menu ${a}`,
                    id: `${m.prefix + m.command} ${a}`
                }))
            }
        ]

        let listMessage = {
            title: 'Click Here⎙',
            sections
        };
        m.reply({
            location: {
                degreesLatitude: 0,
                degreesLongitude: 0,
                isLive: true,
                jpegThumbnail: await sock.resize(fs.readFileSync('./image/Hanako-kun.jpg'), 300, 170)
            },
            caption: "",
            footer: Func.Styles(config.name),
            title: xmenu_oh,
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
                name: 'single_select',
                buttonParamsJson: JSON.stringify(listMessage)
            }, {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: Func.Styles("Link Channel👤"),
                    url: config.wagc,
                    merchant_url: config.wagc
                })
            }]
        })

        await m.reply({
            audio: {
                url: "https://files.catbox.moe/ujx8u9.m4a"
            },
            mimetype: 'audio/mpeg',
            ptt: true
        })
    }
}

deku.command = "menu"
deku.alias = ["leogg", "dekugg", "dekugz", "help"]
deku.category = ["main"]
deku.settings = {}
deku.description = "Memunculkan menu"
deku.loading = true

module.exports = deku
