let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {
    if (!text) return m.reply(Func.Styles(`\`[ Search ]\` ${m.prefix + m.command} hanako-kun\n\n\`[ Download ]\` ${m.prefix + m.command} https://www.snackvideo.com/@Yashiro-San/video/5192800479202629406`))
    if (/.snackvideo.com/.test(text)) {
        const dlsnack = await Scraper.SnackVideo.download(text)

        let capt = `\`[ metadata ]\`\n\n`
        capt += Object.entries(dlsnack.metadata)
            .map(([b, c]) => `> *- ${b.capitalize()} :* ${c}`)
            .join("\n")

        await m.reply({
            image: {
                url: dlsnack.metadata.thumbnail
            },
            caption: capt
        })

        await m.reply({
            video: {
                url: dlsnack.download
            },
            caption: 'done'
        })
    } else {
        const Snack = await Scraper.SnackVideo.search(text)

        m.reply(Func.Styles(`\`[ Search - SnackVideo ]\`\n\n`) + Snack.map((a) =>
                Object.entries(a)
                .map(([b, c]) => `> *- ${b.capitalize()} :* ${c}`)
                .join("\n"),
            )
            .join("\n\n"))
    }
}

deku.command = "snackvideo"
deku.alias = ["snckdl"]
deku.category = ["downloader"]
deku.settings = {
    limit: true
}
deku.description = "Mendownload/Search SnackVideo"
deku.loading = true

module.exports = deku