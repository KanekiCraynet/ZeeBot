const axios = require('axios');
const cheerio = require('cheerio');

const kusonime = {
    search: async function(query) {
        try {
            const { data } = await axios.get(`https://kusonime.com/?s=${encodeURIComponent(query)}&post_type=post`);
            const $ = cheerio.load(data);
            
            const result = $('.kover').map((_, element) => {
                const $element = $(element);
                return {
                    title: $element.find('.episodeye a').text().trim(),
                    link: $element.find('.episodeye a').attr('href'),
                    thumbnail: $element.find('.thumbz img').attr('src'),
                    postedBy: $element.find('.fa-user').parent().text().replace('Posted by', '').trim(),
                    releaseTime: $element.find('.fa-clock-o').parent().text().replace('Released on', '').trim(),
                    genres: $element.find('.fa-tag').parent().find('a').map((_, genre) => $(genre).text().trim()).get()
                };
            }).get();
            return {
                data: result
            };
        } catch (error) {
            return {
                data: []
            };
        }
    },
    
    detail: async function(url) {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const info = {};
            $('.info p').each((_, element) => {
                const text = $(element).text().trim();
                if (text.includes(':')) {
                    const [key, value] = text.split(':').map(item => item.trim());
                    info[key] = value;
                }
            });
            const synopsis = $('.lexot p').map((_, element) => {
                const text = $(element).text().trim();
                return (!text.includes('Released on') && !text.includes('Credit') && text.length > 0 && !text.includes(':')) ? text : null;
            }).get().filter(Boolean);
            const dlink = {};
            $('.smokeurlrh').each((_, element) => {
                const $element = $(element);
                const quality = $element.find('strong').text().trim();
                const links = {};
                $element.find('a').each((_, link) => {
                    const $link = $(link);
                    links[$link.text().trim()] = $link.attr('href');
                });
                dlink[quality] = links;
            });
            return {
                data: {
                    title: $('.jdlz').text().trim(),
                    thumbnail: $('.post-thumb img').attr('src'),
                    views: $('.viewoy').text().trim(),
                    info,
                    synopsis,
                    dlink
                }
            };
        } catch (error) {
            return {
                data: null
            };
        }
    }
};

class yelah {
search = async function kusosearch(query) {
  return kusonime.search(query)
}

detail = async function kusodetail(url) {
  return kusonime.search(url)
}

}

module.exports = new yelah()