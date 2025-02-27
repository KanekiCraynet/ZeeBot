/**
 * Plugins CJS HDVID by DitzDev
 * Jangan apus WM Woi😂
 * Usahakan baca dulu sampe bawah, Jangan asal copas aja
 * source: https://whatsapp.com/channel/0029VaxCdVuFsn0eDKeiIm2c
 **/

/* Handler command hdvid */
const fs = require('fs');
const {
    exec
} = require('child_process');
const fetch = require('node-fetch');

let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {
    let quoted = q = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || m.quoted).mimetype || ''
    const qmsg = (quoted.msg || m.quoted)
    let fps = parseInt(text)
    if (!/video/.test(mime)) throw `Send/Reply videos with the caption *${m.prefix + m.command}* 60`;
    if ((quoted ? quoted.seconds : m.msg.seconds) > 30) throw `Maksimal video 30 detik!`
    if (!fps) throw `Masukkan fps, contoh: *${m.prefix + m.command}* 60`
    if (fps > 100) throw `Maksimal fps adalah 100 fps!`
    await sock.sendMessage(m.cht, {
        text: 'Wait... Executing the [ffmpeg] and [remini] libraries, This process may take 5-15 minutes'
    }, {
        quoted: m
    })

    const chdir = "hd_video";
    const timestamp = Date.now();
    const pndir = `${chdir}/${m.sender}`;
    const rsdir = `${chdir}/result-${m.sender}`;
    const fdir = `${pndir}/frames/${timestamp}`;
    const rfdir = `${rsdir}/frames/${timestamp}`;
    const rname = `${rsdir}/${m.sender}-${timestamp}.mp4`;

    const dirs = [chdir, pndir, rsdir, `${pndir}/frames`, fdir, `${rsdir}/frames`, rfdir];
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    });

    const media = await sock.downloadAndSaveMediaMessage(qmsg, `${pndir}/${timestamp}`);

    await new Promise((resolve, reject) => {
        exec(`ffmpeg -i ${media} -vf "fps=${fps}" ${fdir}/frame-%04d.png`, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });

    const images = fs.readdirSync(fdir);
    let result = {};

    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        result[image] = Scraper.reminihdvid.remini(fs.readFileSync(`${fdir}/${image}`), "enhance");
    }

    const values = await Promise.all(Object.values(result));
    Object.keys(result).forEach((key, index) => {
        result[key] = values[index];
    });

    for (let i of Object.keys(result)) {
        fs.writeFileSync(`${rfdir}/${i}`, result[i])
    }

    await new Promise((resolve, reject) => {
        exec(`ffmpeg -framerate ${fps} -i ${rfdir}/frame-%04d.png -i ${media} -c:v libx264 -pix_fmt yuv420p -c:a aac -strict experimental -shortest ${rname}`, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
    sock.sendMessage(m.cht, {
        video: fs.readFileSync(rname)
    }, {
        quoted: m
    })
};

deku.command = "remini-video"
deku.alias = ["hdvd", "hd-video"]
deku.category = ["tools"]
deku.settings = {
    limit: true
}
deku.description = "Menjernihkan video"
deku.loading = true

module.exports = deku
