const axios = require('axios')
const cheerio = require('cheerio')

module.exports = {
    command: "zerochan",
    alias: ["zero", "zeroch", "zrch"],
    category: ["anime"],
    settings: {
        limit: true,
    },
    description: "Search Anime Foto",
    loading: true,
    async run(m, {
        sock,
        Func,
        text,
        config
    }) {
        if (!text) throw 'Nama Anime?'
        let zerochanft = await zerochan(text)
        let pickget = zerochanft[Math.floor(Math.random() * zerochanft.length)]
        let detail = await zerochanDetail(pickget.id)

        await sock.sendMessage(m.cht, {
            image: {
                url: detail.downloadLink
            },
            caption: `Judul : ${detail.title}`,
            footer: config.ownername,
            buttons: [{
                buttonId: ".zerochan " + text,
                buttonText: {
                    displayText: 'Next'
                }
            }],
            viewOnce: true,
            headerType: 6,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: config.saluran,
                    newsletterName: `Zerochan By: ${config.ownername}`,
                    serverMessageId: 143
                }
            }
        }, {
            quoted: m
        });
    }
}

async function zerochan(search) {
    const url = `https://www.zerochan.net/search?q=${encodeURIComponent(search)}`;
    try {
        const {
            data
        } = await axios.get(url);
        const $ = cheerio.load(data);
        const imageDetails = [];

        $('.thumb img').each((index, element) => {
            const imgUrl = $(element).attr('data-src') || $(element).attr('src');
            const link = $(element).closest('a').attr('href');
            const title = $(element).attr('alt');

            if (imgUrl && link && title) {
                imageDetails.push({
                    id: `https://www.zerochan.net${link}`,
                    title: title,
                    imgUrl: imgUrl
                });
            }
        });

        return imageDetails;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function zerochanDetail(url) {
    try {
        const {
            data
        } = await axios.get(`${url}`);
        const $ = cheerio.load(data);

        const scriptContent = $('script[type="application/ld+json"]').html();
        const jsonData = JSON.parse(scriptContent);

        const title = jsonData.name;
        const downloadLink = jsonData.contentUrl;

        return {
            title,
            downloadLink
        };
    } catch (error) {
        console.error('Error:', error);
    }
}