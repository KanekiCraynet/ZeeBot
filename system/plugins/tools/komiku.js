module.exports = {
    command: "komiku",
    alias: ["kmi", "manga"],
    category: ["tools"],
    settings: {
        limit: true
    },
    description: "Download/Search/Detail Komiku",
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
        switch (m.command) {
            case "komiku":
            case "kmi":
            case "manga": {
                if (!text) throw ` - \`[ Contoh ]\`\n\n> Search\n${m.prefix + m.command} <query>\n\n> Detail\n${m.prefix + m.command} <link>\n\n> download\n${m.prefix + m.command} <link> download`
                if (text.includes("https://komiku.id/manga/")) {
                    await Scraper.Komiku.detail(text).then(async (a) => {
                        let caption = Func.Styles(`> ⏤͟͟͞͞╳── *[ detail ]* ── .々─ᯤ\n\n`)
                        caption += `${Object.entries(a.metadata).map(([a, b, i]) => `> *- ${Func.Styles(`${ a.capitalize()}`)} :* ${b}`).join("\n")}\n\n`
                        caption += Func.Styles(`> ⏤͟͟͞͞╳── *[ Chapter / ${a.chapter.length} ]* ── .々─ᯤ\n\n`)
                        caption += a.chapter.map((a) => Object.entries(a).map(([b, c]) => `> *- ${Func.Styles(`${b.capitalize()}`)} :* ${c}`).join("\n")).join("\n\n");
                        await sock.sendAliasMessage(m.cht, {
                            text: caption
                        }, a.chapter.map((a, i) => ({
                            alias: `${i + 1}`,
                            response: `${m.prefix + m.command} --download ${a.url}`
                        })), m);
                    })
                } else if (text.includes('https://komiku.id//')) {
                    await Scraper.Komiku.chapter(m.args[1]).then(async (a) => {
                        let caption = `> ⏤͟͟͞͞╳── *[ download ]* ── .々─ᯤ\n\n`
                        try {
                            caption += `📙 Judul: ${a.metadata.judul}\n`
                            caption += `📅 Tangga: ${a.metadata.tanggal_rilis}\n`
                            caption += `📖 Arah Baca: ${a.metadata.arah_baca}\n\n`
                        } catch (e) {
                            caption += `📙 Judul: ""\n`
                            caption += `📅 Tangga: ""\n`
                            caption += `📖 Arah Baca: ""\n\n`
                        }
                        caption += `> 📁 Nih File Manga Nya`
                        sock.sendMessage(m.cht, {
                            document: a.buffer,
                            caption: Func.Styles(caption),
                            mimetype: 'application/pdf',
                            fileName: a.metadata.judul + '.pdf'
                        }, {
                            quoted: m
                        })
                    })
                } else if (text) {
                    await Scraper.Komiku.search(text).then(async (a) => {
                        let caption = Func.Styles(`> ⏤͟͟͞͞╳── *[ search / ${a.length} ]* ── .々─ᯤ\n\n`)
                        caption += a.map((a) => Object.entries(a).map(([b, c]) => `> *- ${Func.Styles(`${b.capitalize()}`)} :* ${c}`).join("\n")).join("\n\n");
                        caption += `\n\n> Reply Pesan Pilih \`[ Nomor ]\` Mau Nomor Berapa Terserah`
                        await sock.sendAliasMessage(m.cht, {
                            text: caption
                        }, a.map((a, i) => ({
                            alias: `${i + 1}`,
                            response: `${m.prefix + m.command} ${a.url}`
                        })), m)
                    })
                }
            }
            break
        }
    }
}
