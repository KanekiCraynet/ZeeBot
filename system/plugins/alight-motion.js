const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    command: "presetam",
    alias: ["alightmotion"],
    category: ["main"],
    description: "Menampilkan menu bot",
    loading: true,
    async run(m, { sock, config, Func, text }) {

const ya = `Ex : .presetam https://alightcreative.com/am/share/u/FttFe29F5Dd3AUOxUIiztaBmABw2/p/sd8WMnsElo-b71f57e092dbe21f?source=link`

if (!text) return m.reply(ya)
if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`)
    if (!(text.includes('alight.link') || text.includes('alightcreative.com'))) return m.reply(`Invalid Alight Motion URL.`)
    
async function alightScrape(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://alight.link',
      },
    });

const $ = cheerio.load(response.data);
const title = $('meta[property="og:title"]').attr('content').text();
const description = $('meta[property="og:description"]').attr('content').text();
return {
   title,
   description
}

/**
{
  title: 'Nama Proyek 22',
  description: 'This Alight Motion package contains 1 project, total 19.3 MB.'
}
*/

  } catch (error) {
    return error
  }
}
const njut = alightScrape(text);
m.reply(`[ *PRESET ALIGHT MOTION* ]

Judul: ${njut.title}
Deskripsi: ${njut.description}
`)
}
}