const crypto = require("crypto");
const axios = require("axios");
const fs = require("fs");

class Command {
    constructor() {
        this.command = "pixiv"
        this.alias = [
            "pvsrch",
            "pixivsearch"
        ]
        this.category = [
            "tools"
        ]
        this.settings = {
            limit: true
        }
        this.description = "Search Foto Pixiv"
        this.loading = true
    }
    run = async (m, {
        sock,
        client,
        conn,
        DekuGanz,
        Func,
        Scraper,
        text,
        config
    }) => {

        if (!text) throw Func.Styles(`
Pilih mau type apa

\`[ Biasa ]\` ${m.prefix + m.command} <query>
\`[ Manga ]\` ${m.prefix + m.command} <query> --manga
\`[ Novel ]\` ${m.prefix + m.command} <query> --novel
\`[ Works ]\` ${m.prefix + m.command} <query> --works
`)

        if (m.args[1] == "--manga") {
            const getft = await pixiv.pixivNet(m.args[0])
            let pickget = getft.manga[Math.floor(Math.random() * getft.manga.length)]
            const {
                get: data
            } = await pixiv.getImagesFromPixiv(pickget.url)
            sock.sendMessage(m.cht, {
                image: fs.readFileSync(data),
                caption: "done"
            }, {
                quoted: m
            })
        } else if (m.args[1] == "--novel") {
            const getft = await pixiv.pixivNet(m.args[0])
            let pickget = getft.novel[Math.floor(Math.random() * getft.novel.length)]
            const {
                get: data
            } = await pixiv.getImagesFromPixiv(pickget.url)
            sock.sendMessage(m.cht, {
                image: fs.readFileSync(data),
                caption: "done"
            }, {
                quoted: m
            })
        } else if (m.args[1] == "--works") {
            const getft = await pixiv.pixivNet(m.args[0])
            let pickget = getft.works[Math.floor(Math.random() * getft.works.length)]
            const {
                get: data
            } = await pixiv.getImagesFromPixiv(pickget.url)
            sock.sendMessage(m.cht, {
                image: fs.readFileSync(data),
                caption: "done"
            }, {
                quoted: m
            })
        } else if (text) {
            const getft = await pixiv.pixivNet(text)
            let pickget = getft.illusts[Math.floor(Math.random() * getft.illusts.length)]
            const {
                get: data
            } = await pixiv.getImagesFromPixiv(pickget.url)
            sock.sendMessage(m.cht, {
                image: fs.readFileSync(data),
                caption: "done"
            }, {
                quoted: m
            })
            await fs.unlinkSync(data)
        }
    }
}

module.exports = new Command();

function generateHash(input) {
    return crypto.createHash('sha1').update(input).digest('hex');
}

const pixiv = {
    pixivNet: async (query) => {
        let hash = await generateHash(query);
        let {
            data: pixiv
        } = await axios.get(`https://pixiv.net/touch/ajax/tag_portal?word=${query}&lang=id&version=${hash}`)
        const getft = pixiv.body
        const works = getft.popularWorks.map((a) => {
            const tags = a.tags
            const title = a.title
            const url = a.url
            return {
                title: title,
                tags: tags,
                url: url
            }
        })
        const illusts = getft.illusts.map((a) => {
            const tags = a.tags
            const title = a.title
            const url = a.url
            return {
                title: title,
                tags: tags,
                url: url
            }
        })
        const manga = getft.manga.map((a) => {
            const tags = a.tags
            const title = a.title
            const url = a.url
            return {
                title: title,
                tags: tags,
                url: url
            }
        })
        const novel = getft.novels.map((a) => {
            const tags = a.tags
            const title = a.title
            const url = a.url
            return {
                title: title,
                tags: tags,
                url: url
            }
        })
        return {
            works,
            illusts,
            manga,
            novel
        }
    },

    getImagesFromPixiv: async (urlImages) => {
        const headers = {
            "Referer": "https://www.pixiv.net/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; Mobile; rv:119.0) Gecko/119.0 Firefox/119.0",
            "Accept": "image/avif,image/webp,*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "DNT": "1"
        };

        try {
            const {
                data
            } = await axios.get(urlImages, {
                headers,
                responseType: "arraybuffer"
            });
            const file = "./tmp/" + Date.now() + ".jpg"
            fs.mkdirSync("./tmp", {
                recursive: true
            })
            fs.writeFileSync(file, data);

            return {
                get: file
            }
        } catch (err) {
            console.error("Gagal download:", err.message);
        }
    }
}
