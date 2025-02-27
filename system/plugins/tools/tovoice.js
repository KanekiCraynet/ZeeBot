const fs = require('fs')
const path = require('path')
const {
    spawn
} = require('child_process')
const axios = require('axios')

let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {

    let q = m.quoted ? m.quoted : m;
    if (!/video|audio/.test(q.msg.mimetype))
        throw `> Send Audio/video reply kalau video send trus teks .tovn`;
    let buf = await q.download()
    let audio = await toPTT(buf, 'mp4')
    await sock.sendMessage(m.cht, {
        audio: audio,
        mimetype: 'audio/ogg; codecs=opus',
        ptt: true
    }, {
        quoted: m
    })
}

deku.command = "tovoice"
deku.alias = ["tovn"]
deku.category = ["tools"]
deku.settings = {
    limit: true
}
deku.description = "Mengconvert Audio/video ke vn"
deku.loading = true

module.exports = deku

function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
    return new Promise(async (resolve, reject) => {
        try {
            let tmp = path.join(process.cwd() + `/tmp` + new Date + '.' + ext)
            let out = tmp + '.' + ext2
            await fs.promises.writeFile(tmp, buffer)
            spawn('ffmpeg', [
                    '-y',
                    '-i', tmp,
                    ...args,
                    out
                ])
                .on('error', reject)
                .on('close', async (code) => {
                    try {
                        await fs.promises.unlink(tmp)
                        if (code !== 0) return reject(code)
                        resolve(await fs.promises.readFile(out))
                        await fs.promises.unlink(out)
                    } catch (e) {
                        reject(e)
                    }
                })
        } catch (e) {
            reject(e)
        }
    })
}

function toPTT(buffer, ext) {
    return ffmpeg(buffer, [
        '-vn',
        '-c:a', 'libopus',
        '-b:a', '128k',
        '-vbr', 'on',
        '-compression_level', '10'
    ], ext, 'opus')
}