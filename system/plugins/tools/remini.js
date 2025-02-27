class Command {
    constructor() {
        this.command = "remini"
        this.alias = [
            "hdr", "hd"
        ]
        this.category = [
            "tools"
        ]
        this.settings = {
            limit: true
        }
        this.description = "menjernihkan Foto"
        this.loading = true
    }
    run = async (m, {
        sock,
        client,
        conn,
        DekuGanz,
        Func,
        Uploader,
        Scraper,
        text,
        config
    }) => {

        /**
         * Contoh penggunaaan
         */
        let quoted = m.quoted ? m.quoted : m;
        if (!/image/.test(quoted.msg.mimetype) || !quoted.isMedia)
            throw `> Reply/Kirim photo yang mau di jernihkan`;
        try {
            const media = await quoted.download()
            const IMAGE = await Uploader.tmpfiles(media);
            const SETTINGS = {
                face_enhance: {
                    model: "remini"
                },
                background_enhance: {
                    model: "rhino-tensorrt"
                },
                bokeh: {
                    aperture_radius: "0",
                    highlights: "0.20",
                    vivid: "0.75",
                    group_picture: "true",
                    rescale_kernel_for_small_images: "true",
                    apply_front_bokeh: "false"
                },
                jpeg_quality: 90
            }
            const result = await Scraper.reminiweb(IMAGE, SETTINGS); // Buffer atau Foto
            const Ukuran = await Func.getSize(result.no_wm)
            sock.sendMessage(m.cht, {
                image: {
                    url: result.no_wm
                },
                caption: Func.Styles(`📷 Photo Remini\n> • 📁 *Size: ${Ukuran}*`)
            }, {
                quoted: m
            })
        } catch (e) {
            m.reply('maaf terjadi error: ' + e)
        }
    }
}

module.exports = new Command();
