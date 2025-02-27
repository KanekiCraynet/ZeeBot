const axios = require("axios");

module.exports = {
    command: "spotify",
    alias: ["spdl"],
    category: ["downloader"],
    settings: {
        limit: true
    },
    description: "Mendownload/Search Music Spotify",
    loading: true,
    async run(m, {
        sock,
        Func,
        Scraper,
        Uploader,
        store,
        text,
        config
    }) {
        if (!text)
            throw `> *乂 Cara Penggunaan :*
> *-* Masukan Query untuk mencari musik
> *-* Masukan Url untuk mendownload musik

> *乂 Contoh Penggunaan :*
> *- ${m.prefix + m.command} Menggapai mentari - Aretha Kirana
> *- ${m.prefix + m.command} https://open.spotify.com/track/52SSvrnwEf8VUW1Y5IwPEw*`;

        if (/open.spotify.com/.test(text)) {

            const downloadersp = await axios.get('https://spotifyapi.caliphdev.com/api/info/track?url=' + text).then(a => a.data)

            let cap = `*– 乂 Spotify - download*
`;
            cap += `> ${Func.Styles(`title: ${downloadersp.title}`)}\n`;
            cap += `> ${Func.Styles(`duration: ${downloadersp.duration}`)}\n`;
            cap += `> ${Func.Styles(`cover:`)} ${downloadersp.durationMs}\n`;
            m.reply(cap)
            try {
                const spdl = await Scraper.spotify.download(text)

                sock.sendMessage(m.cht, {
                    audio: {
                        url: spdl.download.file_url
                    },
                    mimetype: 'audio/mpeg'
                }, {
                    quoted: m
                })
            } catch (err) {
                try {
                    sock.sendMessage(m.cht, {
                        audio: {
                            url: `https://spotifyapi.caliphdev.com/api/download/track?url=${downloadersp.url}`,
                        },
                        mimetype: "audio/mpeg",
                    }, {
                        quoted: m
                    });
                } catch (err) {
                    try {
                        const downloadersp = await Scraper.fabdlsp(text)
                        let capt = `*– 乂 Spotify - download*
`;
                        capt += `> ${Func.Styles(`title: ${downloadersp.title}`)}\n`;
                        capt += `> ${Func.Styles(`duration: ${downloadersp.duration}`)}\n`;
                        capt += `> ${Func.Styles(`cover:`)} ${downloadersp.cover}\n`;
                        capt += `> ${Func.Styles(`url:`)} ${downloadersp.download}\n`;
                        m.reply(capt)
                        sock.sendMessage(m.cht, {
                            audio: {
                                url: downloadersp.download,
                            },
                            mimetype: "audio/mpeg",
                        }, {
                            quoted: m
                        });
                    } catch (err) {
                        m.reply('maaf error......')
                    }
                }
            }

        } else {
            let data = await Scraper.spotify.search(text);
            let caps = `*– 乂 Spotify - search*\n\n`;
                  caps += `Buat Pilih Reply \`[ Nomor ]\` Buat Downloader\n\n`
            let no = 1
            for (let i of data) {
                caps += `> ======== \`[ ${no++} ]\` ========\n`;
                caps += `> ${Func.Styles(`title: ${i.title}`)}\n`;
                caps += `> ${Func.Styles(`duration: ${i.duration}`)}\n`;
                caps += `> ${Func.Styles(`artist: ${i.artist}`)}\n`;
                caps += `> ${Func.Styles(`url:`)} ${i.url}\n> ========================\n\n`;
            }
            await sock.sendAliasMessage(m.cht, {
                text: caps
            }, data.map((a, i) => ({
                alias: `${i + 1}`,
                response: `${m.prefix + m.command} ${a.url}`
            })), m);
        }
    }
}
