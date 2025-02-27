/**==================================
> Arigato Andhika Skrep nya: Bstation
> Source Scrape: https://whatsapp.com/channel/0029VaAMjXT4yltWm1NBJV3J
==================================**/


const axios = require('axios');
const cheerio = require('cheerio');

class bstation {
    search = async function(query, page = 1) {
        try {
            const res = await axios.get("https://api.bilibili.tv/intl/gateway/web/v2/search_v2", {
                params: {
                    's_locale': 'id_ID',
                    'platform': 'web',
                    keyword: query,
                    highlight: 1,
                    pn: page,
                    ps: 20,
                }
            });
            const data = res.data.data.modules[0].items.map(item => ({
                title: item.title,
                url: 'https://bilibili.tv/video/' + item.aid,
                id: item.aid,
                author: item.author,
                thumbnail: item.cover,
                view: item.view,
                duration: item.duration,
            }))
            return {
                status: true,
                data
            }
        } catch (e) {
            return {
                status: false,
                message: 'Search not found'
            }
        }
    }


    download = async function(url, quality = '480P') {
        try {
            let aid = /\/video\/(\d+)/.exec(url)?.[1];

            if (!aid) return {
                status: false,
                message: 'ID Video not found'
            }

            const appInfo = await axios.get(url).then(res => res.data)

            const $ = cheerio.load(appInfo);
            const title = $('meta[property="og:title"]').attr('content').split('|')[0].trim();
            const locate = $('meta[property="og:locale"]').attr('content');
            const description = $('meta[property="og:description"]').attr('content');
            const type = $('meta[property="og:video:type"]').attr('content');
            const cover = $('meta[property="og:image"]').attr('content');
            const like = $('.interactive__btn.interactive__like .interactive__text').text();
            const views = $('.bstar-meta__tips-left .bstar-meta-text').first().text();

            const response = await axios.get('https://api.bilibili.tv/intl/gateway/web/playurl', {
                params: {
                    's_locale': 'id_ID',
                    'platform': 'web',
                    'aid': aid,
                    'qn': '64',
                    'type': '0',
                    'device': 'wap',
                    'tf': '0',
                    'spm_id': 'bstar-web.ugc-video-detail.0.0',
                    'from_spm_id': 'bstar-web.homepage.trending.all',
                    'fnval': '16',
                    'fnver': '0',
                    'fnver': '0',
                    'fnval': '16',
                }
            }).then(res => res.data)

            const video = response.data.playurl.video.map(item => {
                return {
                    quality: item.stream_info.desc_words,
                    codecs: item.video_resource.codecs,
                    size: item.video_resource.size,
                    mime: item.video_resource.mime_type,
                    url: item.video_resource.url || item.video_resource.backup_url[0]
                }
            })

            const audio = response.data.playurl.audio_resource.map(item => {
                return {
                    size: item.size,
                    url: item.url || item.backup_url[0]
                }
            })
            const v = video.filter(v => v.quality == quality)[0];
            if (!v) {
                throw new Error('No video found');
            }

            return {
                status: true,
                data: {
                    title,
                    locate,
                    description,
                    type,
                    cover,
                    views,
                    like,
                    media: {
                        video,
                        audio,
                    }
                }
            }
        } catch (error) {
            return {
                status: false,
                message: error.message || 'Something went wrong'
            }
        }
    }

    getVideo = async function(url) {
        const headers = {
            'DNT': '1',
            'Origin': 'https://www.bilibili.tv',
            'Referer': `https://www.bilibili.tv/video/`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
        };

        try {
            let buffers = [];
            let start = 0;
            let end = 5 * 1024 * 1024; // 5MB chunks
            let fileSize = 0;

            while (true) {
                const range = `bytes=${start}-${end}`;

                const response = await axios.get(url, {
                    headers: {
                        ...headers,
                        Range: range
                    },
                    responseType: 'arraybuffer'
                });

                if (fileSize === 0) {
                    const contentRange = response.headers['content-range'];
                    if (contentRange) {
                        fileSize = parseInt(contentRange.split('/')[1]);
                    }
                }

                buffers.push(Buffer.from(response.data));

                if (end >= fileSize - 1) {
                    break;
                }

                start = end + 1;
                end = Math.min(start + 5 * 1024 * 1024 - 1, fileSize - 1);
            }

            const finalBuffer = Buffer.concat(buffers);
            return finalBuffer;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new bstation()