const axios = require('axios')
const cheerio = require('cheerio')

module.exports = {
command: "otakudesu",
alias: [ ],
category: ["anime"],
  settigs: {
    limit: true,
  },
description: "Search Judul Anime",
loading: true,
async run(m, { sock, Func, Scraper, text, config }) {

if(!text) throw 'mau search judul anime apa?'

let query = text.trim()
let result = await otakudesu.search(query)
if (!result || result.length === 0) {
  m.reply('Yang Ada Search Ga ketemu')
}

let anime = `⏤͟͟͞͞╳── *[ sᴇᴀʀᴄʜ - ᴀɴɪᴍᴇ - ᴏᴛᴀᴋᴜᴅᴇsᴜ ]* ── .々─ᯤ 
│    =〆 ᴛɪᴛʟᴇ: ${result[0].title}
│    =〆 ɢᴇɴʀᴇs: ${result[0].genres}
│    =〆 sᴛᴀᴛᴜs: ${result[0].status}
│    =〆 ʀᴀᴛɪɴɢ: ${result[0].rating}
│    =〆 ʟɪɴᴋ: ${result[0].link}
⏤͟͟͞͞╳────────── .✦`

await m.reply({
text: anime,
contextInfo: {
      isForwarded: true,
     forwardingScore: 99999,
    externalAdReply: {
      showAdAttribution: true,
      title: result[0].title,
      mediaType: 1,
      previewType: 1,
      body: result.rating,
      //previewType: "PHOTO",
      thumbnailUrl: result[0].imageUrl,
      renderLargerThumbnail: false,
      mediaUrl: result[0].link,
      sourceUrl: result[0].link
     },
      forwardedNewsletterMessageInfo: {
 newsletterJid: config.saluran,
 newsletterName: `By : ${config.ownername}`,
 serverMessageId: 143
    }
  }
})

}
}

const otakudesu = {
  ongoing: async () => {
    try {
        const { data } = await axios.get('https://otakudesu.cloud/');
        const $ = cheerio.load(data);
        const results = [];

        $('.venz ul li').each((index, element) => {
            const episode = $(element).find('.epz').text().trim();
            const type = $(element).find('.epztipe').text().trim();
            const date = $(element).find('.newnime').text().trim();
            const title = $(element).find('.jdlflm').text().trim();
            const link = $(element).find('a').attr('href');
            const image = $(element).find('img').attr('src');

            results.push({
                episode,
                type,
                date,
                title,
                link,
                image
            });
        });

        return results;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  },
  search: async (query) => {
    const url = `https://otakudesu.cloud/?s=${query}&post_type=anime`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const animeList = [];
        
        $('.chivsrc li').each((index, element) => {
            const title = $(element).find('h2 a').text().trim();
            const link = $(element).find('h2 a').attr('href');
            const imageUrl = $(element).find('img').attr('src');
            const genres = $(element).find('.set').first().text().replace('Genres : ', '').trim();
            const status = $(element).find('.set').eq(1).text().replace('Status : ', '').trim();
            const rating = $(element).find('.set').eq(2).text().replace('Rating : ', '').trim() || 'N/A';

            animeList.push({
                title,
                link,
                imageUrl,
                genres,
                status,
                rating
            });
        });
        return animeList;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'Error fetching data' };
    }
  },
  detail: async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
       
        const animeInfo = {
            title: $('.fotoanime .infozingle p span b:contains("Judul")').parent().text().replace('Judul: ', '').trim(),
            japaneseTitle: $('.fotoanime .infozingle p span b:contains("Japanese")').parent().text().replace('Japanese: ', '').trim(),
            score: $('.fotoanime .infozingle p span b:contains("Skor")').parent().text().replace('Skor: ', '').trim(),
            producer: $('.fotoanime .infozingle p span b:contains("Produser")').parent().text().replace('Produser: ', '').trim(),
            type: $('.fotoanime .infozingle p span b:contains("Tipe")').parent().text().replace('Tipe: ', '').trim(),
            status: $('.fotoanime .infozingle p span b:contains("Status")').parent().text().replace('Status: ', '').trim(),
            totalEpisodes: $('.fotoanime .infozingle p span b:contains("Total Episode")').parent().text().replace('Total Episode: ', '').trim(),
            duration: $('.fotoanime .infozingle p span b:contains("Durasi")').parent().text().replace('Durasi: ', '').trim(),
            releaseDate: $('.fotoanime .infozingle p span b:contains("Tanggal Rilis")').parent().text().replace('Tanggal Rilis: ', '').trim(),
            studio: $('.fotoanime .infozingle p span b:contains("Studio")').parent().text().replace('Studio: ', '').trim(),
            genres: $('.fotoanime .infozingle p span b:contains("Genre")').parent().text().replace('Genre: ', '').trim(),
            imageUrl: $('.fotoanime img').attr('src')
        };

        const episodes = [];
        $('.episodelist ul li').each((index, element) => {
            const episodeTitle = $(element).find('span a').text();
            const episodeLink = $(element).find('span a').attr('href');
            const episodeDate = $(element).find('.zeebr').text();
            episodes.push({ title: episodeTitle, link: episodeLink, date: episodeDate });
        });

        return {
            animeInfo,
            episodes
        };
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'Error fetching data' };
    }
  },
  download: async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
       
        const episodeInfo = {
            title: $('.download h4').text().trim(),
            downloads: []
        };

        $('.download ul li').each((index, element) => {
            const quality = $(element).find('strong').text().trim();
            const links = $(element).find('a').map((i, el) => ({
                quality,
                link: $(el).attr('href'),
                host: $(el).text().trim()
            })).get();
            episodeInfo.downloads.push(...links);
        });
        return episodeInfo;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'Error fetching data' };
    }
  }
}