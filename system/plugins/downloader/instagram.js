let rinokumura = {
    command: "Instagram",
    alias: ["igdl", "ig", "igvideo", "igreel"],
    category: ["downloader"],
    settings: {
        limit: true,
    },
    loading: true,
    async run(m, {
        sock,
        client,
        conn,
        DekuGanz,
        Func,
        Scraper,
        text,
        config
    }) {
        if (!text) throw "> Reply atau masukan link dari Instagram";
        if (!/instagram.com/.test(text)) throw "> Masukan link Instagram nya";
        let data = await Scraper.Instagram(text);
        if (!data) return;
        let caption = `*– 乂 Instagram downloader*\n`
        caption += Object.entries(data.metadata)
            .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
            .join("\n")
        if (data.type === "slide") {
            let medias = []
            for (let i of data.url) {
                medias.push({
                    type: 'image',
                    data: {
                        url: i
                    }
                })
            }

            sock.sendAlbumMessage(m.cht, medias, {
                caption,
                quoted: m
            })
        } else if (data.type === "video") {
            m.reply({
                video: {
                    url: data.url[0]
                },
                caption
            })
        } else m.reply('ups seperti nya dl sama metadata nya gada😂')
    }
}

module.exports = rinokumura
