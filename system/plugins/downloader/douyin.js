let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {
    if (!text.includes('v.douyin.com')) throw 'masukan link douyin nya!'
    await Scraper.douyin.download(text).then(async (a) => {
        sock.sendMessage(m.cht, {
            video: {
                url: a[0].link
            },
            caption: 'done'
        }, {
            quoted: m
        })
    })
}

deku.command = "douyin"
deku.alias = ["dydl", "douyindl"]
deku.category = ["downloader"]
deku.settings = {
    limit: true
}
deku.description = "mendownload douyin"
deku.loading = true

module.exports = deku