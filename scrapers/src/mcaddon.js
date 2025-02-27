//arigato skrep nya sel >\\<

const axios = require('axios');
const cheerio = require('cheerio');

class mcaddon {
addons = async function addons(name) {
  const { data } = await axios.get(`https://mmcreviews.com/?s=${name}&id=1274&post_type=post`);
  const $ = cheerio.load(data);

  const modpacks = [];

  $('.post').each((i, element) => {
    const title = $(element).find('.entry-title a').text().trim();
    const link = $(element).find('.entry-title a').attr('href');
    const description = $(element).find('.ast-excerpt-container p').text().trim();
    const rating = $(element).find('.glsr-summary-rating .glsr-tag-value').text().trim();
    const tags = [];
    $(element).find('.taxonomy-tag a').each((i, tag) => {
      tags.push($(tag).text().trim());
    });

    modpacks.push({
      title,
      link,
      description,
      rating,
      tags
    });
  });

  return modpacks;
}

detailAddons = async function detailAddons(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const image = $('figure img').attr('src');
  const title = $('h1').text();
  const subtitle = $('h4').text();
  const gameplay = $('.stk-block-text__text').text();
  
  return {
    image,
    title,
    subtitle,
    gameplay
  };
}
}

module.exports = new mcaddon()