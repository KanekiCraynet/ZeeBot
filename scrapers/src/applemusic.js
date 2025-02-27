const axios = require("axios")
const cheerio = require("cheerio")

function clean(str) {
    const regex = /['"]/g;
    return str.replace(regex, '');
}

class AppleMusic {
    search = async function(q) {
        return new Promise(async (resolve, reject) => {
            await axios
                .get("https://music.apple.com/id/search?term=" + encodeURIComponent(q))
                .then((a) => {
                    let $ = cheerio.load(a.data);
                    let array = [];
                    $(".shelf-grid__body ul li .track-lockup").each((a, i) => {
                        let title = $(i)
                            .find(".track-lockup__content li")
                            .eq(0)
                            .find("a")
                            .text()
                            .trim();
                        let album = $(i)
                            .find(".track-lockup__content li")
                            .eq(0)
                            .find("a")
                            .attr("href");
                        let crop = $(i)
                            .find(".track-lockup__content li")
                            .eq(0)
                            .find("a")
                            .attr("href")
                            .split("/")
                            .pop();
                        let song =
                            album
                            .replace(crop, "")
                            .trim()
                            .replace("/album/", "/song/")
                            .trim() + album.split("i=")[1];
                        let image = $(i)
                            .find(".svelte-3e3mdo source")
                            .eq(1)
                            .attr("srcset")
                            .split(",")[1]
                            .split(" ")[0]
                            .trim();
                        let artist = {
                            name: $(i)
                                .find(".track-lockup__content li")
                                .eq(1)
                                .find("a")
                                .text()
                                .trim(),
                            url: $(i)
                                .find(".track-lockup__content li")
                                .eq(1)
                                .find("a")
                                .attr("href"),
                        };
                        array.push({
                            title,
                            image,
                            song,
                            artist,
                        });
                    });
                    resolve(array);
                });
        });
    };

    /**
    > Downloader Apple music
    > Out nya mp4, tapi bisa di pake audio nya

    > ndbotz https://whatsapp.com/channel/0029VaAMjXT4yltWm1NBJV3J
    **/

    download = async function(linkk) {
        try {
            const baseurl = 'https://aaplmusicdownloader.com'
            const detail = await axios.get(baseurl + '/api/applesearch.php', {
                params: {
                    url: linkk
                }
            });
            const {
                name,
                albumname,
                url
            } = detail.data;

            const restk = await axios.get(baseurl + '/song.php')
            const $ = cheerio.load(restk.data)
            const token = $("div.media-info").find('a[href="#"]').attr("token")

            const data = new URLSearchParams();
            data.append('song_name', clean(name));
            data.append('artist_name', clean(albumname));
            data.append('url', url);
            data.append('token', token);

            const dlrespon = await axios.post(baseurl + '/api/composer/swd.php', data, {
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': '_ga=GA1.1.1025091365.1737165195; PHPSESSID=7uf4vrc1auogmgab4d6g6su1eg; _ga_X67PVRK9F0=GS1.1.1737165194.1.1.1737165363.0.0.0; quality=m4a',
                    'Origin': baseurl,
                    'Pragma': 'no-cache',
                    'Referer': baseurl + '/track.php',
                    'Sec-CH-UA': '"Not-A.Brand";v="99", "Chromium";v="124"',
                    'Sec-CH-UA-Mobile': '?1',
                    'Sec-CH-UA-Platform': '"Android"',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            return {
                ...detail.data,
                dl: encodeURI(dlrespon.data.dlink)
            }
        } catch (error) {
            console.error('Error:', error);
            throw error
        }
    }
}

module.exports = new AppleMusic();