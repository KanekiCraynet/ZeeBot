/**
> fungsi and skrep: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
**/

let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {
    if (!Func.isUrl(m.text) || !/tiktok.com/.test(m.text) || !m.text)
        throw `> Reply atau masukan link tiktok yang ingin di download`;
    await Scraper.ttsave.video(text).then(async (a) => {

        let message = Func.Styles(`々- \`[ Downloader - Tiktok ]\` - 々


> Nickname: ${a.nickname || "-"}
> Username*: ${a.username || "-"}
> Deskripsi: ${a.description || "-"}
> View: ${a.stats.plays || "-"} | Like: ${a.stats.like || "-"}
> Comment: ${a.stats.comments || "-"} | share: ${a.stats.shares || "-"}
> Type ${a.type}
`)

        if (a.type === "slide") {
            //hapus wm?=mandul https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
            for (let slide of a.slides) {
                await m.reply({
                    image: {
                        url: slide.url
                    },
                    caption: `slide-${slide.number}.jpg`
                }, {
                    quoted: m
                });
            }
        }
        // Jika media adalah video
        else if (a.type === "video") {
            if (a.videoInfo.nowm) {
                message += `\n\n> Reply Video Trus Ketik \`[ Compress ]\``
                await sock.sendAliasMessage(m.cht, {
                    video: {
                        url: a.videoInfo.nowm
                    },
                    caption: message,
                }, [{
                    alias: 'Compress',
                    response: `.ttcompress ${a.videoInfo.nowm}`
                }], m)
            } else {
                m.reply(m.chat, "Gagal mengambil video tanpa watermark.");
            }
        }

        await m.reply({
            audio: {
                url: a.dlink.audio
            },
            mimetype: 'audio/mpeg',
            fileName: "tiktok.mp3"
        }, {
            quoted: m
        });
    })
}

deku.command = "tiktok"
deku.alias = [
    "tt",
    "ttdl",
    "tiktokdl"
]
deku.category = [
    "downloader"
]
deku.settings = {
    limit: true
}
deku.description = "Download video/slide dari tiktok"
deku.loading = true

module.exports = deku
