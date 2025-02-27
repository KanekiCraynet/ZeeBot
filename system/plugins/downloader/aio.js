/*
> Arigato Axel Scrape Nya
> No Apus Wm Ya Njink
*/

let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {
    if (!text.includes('https')) throw `Masukan Link All Kalau Spotify Sama Yt Gabisa`

    const video = await Scraper.aio(text)

    if (video.medias.length > 0) {

        sock.sendMessage(m.cht, {
            video: {
                url: video.medias[0].url
            },
            caption: 'done'
        }, {
            quoted: m
        })

        const ya = await Scraper.aio(text)

        const slide = await ya.medias.map(a => a.url)

        for (let i of slide) {
            sock.sendMessage(m.cht, {
                image: {
                    url: i
                }
            }, {
                quoted: m
            })
        }
    }
}

deku.command = "aio"
deku.alias = []
deku.category = ["downloader"]
deku.settings = {
    limit: true
}
deku.description = "Mendownload All In One"
deku.loading = true

module.exports = deku