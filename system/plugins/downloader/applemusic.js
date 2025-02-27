class Command {
    constructor() {
        this.command = "applemusic"
        this.alias = ["aplm", "apple"]
        this.category = ["downloader"]
        this.settings = {
            limit: true
        }
        this.description = "Mencari dan download music dari Apple Music !"
        this.loading = true
    }
    run = async (m, {
        sock,
        Func,
        Scraper,
        config,
        store,
        text
    }) => {
        if (!text) throw "> Masukan Pencarian/Link dari Apple Music"
        if (Func.isUrl(text)) {
            if (!/music.apple.com/.test(text)) throw 'masukan link AppleMusic nya!'
            const weh = await Scraper.applemusic.download(text)

            let capt = ` - 々 \`[ Download AppleMusic ]\` 々 - \n`
            capt += Object.entries(weh)
                .map(([a, b]) => `> -々 ${a.capitalize()} :* ${b}`)
                .join("\n")
            m.reply(capt);

            sock.sendMessage(m.cht, {
                audio: {
                    url: weh.dl
                },
                mimetype: 'audio/mpeg'
            }, {
                quoted: m
            })
        } else {
            let data = await Scraper.applemusic.search(text);
            if (data.length === 0) throw "> Music tidak di temukan"
            let cap = "*– 乂 Apple Music*\n> Pilih lagu yang ingin kamu download !"
            for (let i of data) {
                cap += `> *- Title :* ${i.title}\n`
                cap += `> *- Artist :* ${i.artist.name}\n`
                cap += `> *- Url :* ${i.song}\n\n`
            }
            m.reply(cap)

        }
    }
}

module.exports = new Command();