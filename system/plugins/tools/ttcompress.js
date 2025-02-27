const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

let deku = async (m, {
    sock,
    client,
    conn,
    DekuGanz,
    Func,
    Scraper,
    text,
    config
}) => {
    if (!/v16.tiktokcdn.com/.test(text)) throw 'ini untuk compress tiktok'

    const filePath = path.join(process.cwd() + `/tmp/${Date.now()}.mp4`); // Gunakan satu path untuk input & output
    let media = await sock.getBuffer(text)
    await fs.writeFileSync(filePath, media)
    const data = await compressVideo(filePath)

    await sock.sendMessage(m.cht, {
        video: fs.readFileSync(data),
        caption: "done compress nya!😅"
    }, {
        quoted: m
    })

    await sock.delay(2000)
    await fs.unlinkSync(filePath)
}

deku.command = "tiktokcompress"
deku.alias = [
    "ttcompress",
    "ttcmps"
]
deku.category = [
    "tools"
]
deku.settings = {}
deku.description = "Mengcompress video tiktok"
deku.loading = true

module.exports = deku

function compressVideo(file) {
    return new Promise((resolve, reject) => {
        const outputPath = path.join(process.cwd() + `/tmp/${Date.now()}.mp4`);
        ffmpeg(file)
            .outputOptions([
                '-vcodec libx264',
                '-crf 28', // Ubah nilai ini untuk ukuran lebih kecil
                '-preset fast',
                '-b:a 64k',
                '-ac 2',
                '-ar 44100',
                '-y'
            ])
            .on('progress', (progress) => {
                console.log(`Processing: ${progress.percent}% done`);
            })
            .on('end', () => {
                console.log('Kompresi selesai!');
                resolve(outputPath);
            })
            .on('error', (err) => {
                console.error('Error saat mengompresi:', err);
                reject(err);
            })
            .save(outputPath); // Menyimpan langsung ke file yang sama
    });
}
