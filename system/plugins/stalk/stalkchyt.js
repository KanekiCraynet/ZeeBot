let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {
    if (!text) throw Func.Styles(`\`[ link ]\` ${m.prefix + m.command} https://youtube.com/@leooxzy\n\n\`[ query ]\` ${m.prefix + m.command} Leooxzy`)
    if (/www.youtube.com/.test(text)) {
        const ya = await Scraper.YtStalk.LinkYtStalk(text)

        if (!ya === 0) {
            m.reply('link yang di masukin ga di temukan!')
        }

        let cap = `々- \`[ Stalk - YouTube ]\` - 々\n\n`
        cap += Object.entries(ya.channelMetadata)
            .map(([a, b]) => `> 々- ${a.capitalize()} : ${b}`)
            .join("\n")

        sock.sendMessage(m.cht, {
            image: {
                url: ya.channelMetadata.avatarUrl
            },
            caption: cap
        }, {
            quoted: m
        })
    } else {
        const ya = await Scraper.YtStalk.youtubeStalk(text)

        if (!ya === 0) {
            m.reply('user ga di temukan!')
        }

        let cap = `々- \`[ Stalk - YouTube ]\` - 々\n\n`
        cap += Object.entries(ya.channelMetadata)
            .map(([a, b]) => `> 々- ${a.capitalize()} : ${b}`)
            .join("\n")

        sock.sendMessage(m.cht, {
            image: {
                url: ya.channelMetadata.avatarUrl
            },
            caption: cap
        }, {
            quoted: m
        })
    }
}

deku.command = "stalkytchannel"
deku.alias = ["ytchstalk"]
deku.category = ["stalk"]
deku.settings = {
    limit: true
}
deku.description = "Mengstalk Ch"
deku.loading = true

module.exports = deku