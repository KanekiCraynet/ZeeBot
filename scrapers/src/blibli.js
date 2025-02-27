const axios = require("axios");
const FormData = require("form-data");
const cheerio = require("cheerio")

class Blibli {
    getToken = async function() {
        const {
            data: a
        } = await axios.get("https://snapfrom.com/id/pengunduh-video-bilibili/");
        const $ = cheerio.load(a);
        return $("#token").val();
    }

    download = async function(url) {
        if (!url) throw new Error("Masukkan URL Blibli.");

        try {
            const token = await this.getToken();
            const formData = new FormData();
            formData.append("url", url);
            formData.append("token", token);

            const {
                data
            } = await axios.post(
                "https://snapfrom.com/wp-json/aio-dl/video-data/",
                formData, {
                    headers: {
                        ...formData.getHeaders()
                    }
                }
            );

            return data
        } catch (error) {
            console.error(`Terjadi kesalahan: ${error.message}`);
        }
    }
}

module.exports = new Blibli()