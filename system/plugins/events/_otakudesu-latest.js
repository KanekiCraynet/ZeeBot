async function events(m, {
    sock,
    Func,
    Scraper,
    config
}) {
    const datek = new Date((new Date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    }))
    const hours = datek.getHours()
    const minutes = datek.getMinutes()
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
    if (db.list().settings.otakudesu) {
        sock.autoanime = sock.autoanime ? sock.autoanime : {}
        if (config.saluran2 in sock.autoanime) {
            return false
        }
        let jadwalanime = {
            subuh: '00:00',
            pagi: '08:00',
            siang: '12:00',
            sore: '16:00',
            magrib: '18:00',
            malam: '20:00',
            tengah_malam: '23:00',
        }
        for (let [anime, waktu] of Object.entries(jadwalanime)) {
            if (timeNow === waktu) {
                sock.autoanime[config.saluran2] = [
                    scraper.list().otakudesu2.OtakudesuUpdate().then(async (a) => {
                        await sock.sendMessage(config.saluran2, {
                            text: a.map((a) => Object.entries(a).map(([b, c]) => `> *- ${Func.Styles(`${b.capitalize()}`)} :* ${c}`).join("\n")).join("\n\n"),
                            contextInfo: {
                                isForwarded: true,
                                forwardingScore: 99999,
                                externalAdReply: {
                                    showAdAttribution: true,
                                    title: 'Update Ongoing By: Deku',
                                    mediaType: 1,
                                    previewType: 1,
                                    body: 'by: Deku',
                                    //previewType: "PHOTO",
                                    thumbnailUrl: 'https://files.catbox.moe/yy0w5l.jpg',
                                    renderLargerThumbnail: false,
                                    mediaUrl: config.linkch,
                                    sourceUrl: config.linkch
                                },
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: config.saluran,
                                    newsletterName: `By : ${config.ownername}`,
                                    serverMessageId: 143
                                }
                            }
                        }, {})
                    })
                ]
            }
        }
    }
}

module.exports = {
    events
}
