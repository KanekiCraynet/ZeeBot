const axios = require('axios')

const toTime = (ms) => {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
};

async function fabdlsp(url) {
    try {
        const response = await axios
            .get(`https://api.fabdl.com/spotify/get?url=` + url, {
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
                },
            })
            .catch((e) => e.response);

        if (!response.data.result) {
            return {
                msg: "Failed to get track info",
            };
        }
        const {
            data
        } = await axios
            .get(
                `https://api.fabdl.com/spotify/mp3-convert-task/${response.data.result.gid}/${response.data.result.id}`,
            )
            .catch((e) => e.response);
        if (!data?.result?.download_url)
            return {
                msg: "Link download not found !",
            };
        return {
            title: response.data.result.name,
            duration: toTime(response.data.result.duration_ms),
            cover: response.data.result.image,
            download: "https://api.fabdl.com" + data?.result?.download_url,
        };
    } catch (error) {
        return {
            msg: "Error Detected",
            err: error.message,
        };
    }
};

module.exports = fabdlsp