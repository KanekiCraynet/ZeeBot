let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {
    const randome = await Scraper.emotecraft.RANDOM_EMOTES()

    let capt = ` - 々 \`[ Contoh ]\` 々 -

\`[ Search ]\` ${m.prefix + m.command} sleep

\`[ Detail ]\` ${m.prefix + m.command} https://emotes.kosmx.dev/e/94

 - 々 \`[ Emote-Random ]\` 々 -\n\n
`

    for (let i of randome.result) {
        capt += `> title: ${i.title}\n`
        capt += `> author: ${i.author}\n`
        capt += `> DownloadLink: ${i.downloadLink}\n\n`
    }

    if (!text) return m.reply(capt)

    if (/emotes.kosmx.dev/.test(text)) {
        const {
            result
        } = await Scraper.emotecraft.GET_EMOTE_DETAIL(text)

        let capt = ` - 々 \`[ Detail Emotecraft ]\` 々 -\n\n`
        capt += Object.entries(result).map(([a, b]) => `> ${a.capitalize()} : ${b}`).join("\n");

        sock.sendMessage(m.cht, {
            image: {
                url: result.iconUrl
            },
            caption: capt
        }, {
            quoted: m
        })
    } else {
        const hmm = await Scraper.emotecraft.Minecraft_Emote(text)

        let capt = ` - 々 \`[ Search Emotecraft ]\` 々 -\n\n`
        for (let i of hmm.result) {
            capt += `> title: ${i.title}\n`
            capt += `> description: ${i.description}\n`
            capt += `> uploader: ${i.title}\n`
            capt += `> downloadUrl: ${i.downloadUrl}\n\n`
        }

        m.reply(capt)
    }
}

deku.command = "emotecraft"
deku.alias = ["emtc", "emote"]
deku.category = ["search"]
deku.settings = {
    limit: true
}
deku.description = "Mencari/Mendetail Emotecraft"
deku.loading = true

module.exports = deku