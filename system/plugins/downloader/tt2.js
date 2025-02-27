let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {
    await Scraper.ttsave2.video(text).then(async (a) => {

            let message = `
📛 *Nickname*: ${a.nickname || "-"}
🆔 *Username*: ${a.username || "-"}
📝 *Deskripsi*: ${a.description || "-"}
`.trim();
            //wwwmmm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
            //https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
            if (a.type === "slide") {
                message += "\n📷 *Tipe*: Slide (Gambar)";
                await m.reply(message);
                //hapus wm?=mandul https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
                for (let slide of a.slides) {
                    await m.reply({ image: {
                            url: slide.url
                        }, caption: `slide-${slide.number}.jpg`
                    }, {
                        quoted: m
                    });
            }
        }
        // Jika media adalah video
        else if (a.type === "video") {
            message += "\n🎥 *Tipe*: Video";
            if (a.videoInfo.nowm) {
                message += ``;
                await m.reply({
                    video: {
                        url: a.videoInfo.nowm
                    },
                    fileName: "tiktok.mp4",
                    caption: message
                }, {
                    quoted: m
                });
            } else {
                m.reply(m.chat, "Gagal mengambil video tanpa watermark.");
            }
        }

        if (a.audioUrl) {
            message += "\n🎵 *Tipe*: Audio";
            await m.reply({
                audio: {
                    url: a.audioUrl
                },
                mimetype: 'audio/mpeg',
                fileName: "tiktok.mp3"
            }, {
                quoted: m
            });
        }
    })
}

deku.command = "tiktok2"
deku.alias = ["ttdl2"]
deku.category = ["downloader"]
deku.settings = {
    limit: true
}
deku.description = ""
deku.loading = true

module.exports = deku