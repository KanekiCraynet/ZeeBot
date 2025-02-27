/**========================
> Arigato Selxyz Scrape nya: Douyin
> Ch: https://whatsapp.com/channel/0029VamzFetC6ZvcD1qde90Z/3635
========================**/

const axios = require("axios");
const FormData = require("form-data");
const cheerio = require("cheerio");

class douyin {
    download = async function(url) {
        if (!url) throw new Error("Invalid URL");

        const apiURL = "https://savetik.co/api/ajaxSearch";
        const form = new FormData();
        form.append("q", url);
        form.append("lang", "id");
        form.append("cftoken", "");

        const headers = {
            headers: {
                ...form.getHeaders()
            }
        };
        const {
            data
        } = await axios.post(apiURL, form, headers);

        const $ = cheerio.load(data.data);
        const downloadLinks = [];
        $(".dl-action a").each((i, el) => {
            const link = $(el).attr("href");
            const quality = $(el).text().trim();
            if (link) {
                downloadLinks.push({
                    quality,
                    link
                });
            }
        });

        if (downloadLinks.length === 0) {
            throw new Error("No download links found");
        }
        return downloadLinks;
    }
};

module.exports = new douyin();