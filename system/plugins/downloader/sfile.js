let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {

    if (!text.includes('sfile.mobi')) throw 'masukan link sfile nya'

    const file = await Scraper.Sfile(text)

    m.reply({
        document: file.data.result.buffer,
        caption: Object.entries(file.data).map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`).join("\n"),
        mimetype: file.data.mimetype,
        fileName: file.data.result.filename
    })
}

deku.command = "sfile"
deku.alias = []
deku.category = ["downloader"]
deku.settings = {
    limit: true
}
deku.description = "mendownload sfile"
deku.loading = true

module.exports = deku