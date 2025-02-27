module.exports = {
    command: "pushchau",
    alias: ["pscha"],
    category: ["tools"],
    settings: {
        owner: true,
        limit: true,
    },
    description: "PushChAudio",
    loading: true,
    async run(m, {
        text,
        sock,
        Scraper,
        Func,
        config
    }) {
        let q = m.quoted ? m.quoted : m;
        let pp = await sock.profilePictureUrl(m.sender, 'image')

        if (!m.quoted) throw 'reply pesan audio bg'

        await sock.sendMessage(config.saluran, {
            audio: await m.quoted.download(),
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

    },
};