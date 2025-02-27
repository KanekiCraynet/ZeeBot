async function events(m, { sock, Func, config }) {

const datek = new Date((new Date).toLocaleString("en-US", { timeZone: "Asia/Jakarta" }))
const hours = datek.getHours()
const minutes = datek.getMinutes()
const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`

const latest = await Scraper.kuronime.latest()

if (db.list().settings.kuronimeuu) {

sock.autoanime2 = sock.autoanime2 ? sock.autoanime2 : {}
if (config.saluran2 in sock.autoanime2) {
    return false
}
let jadwalanime = {
    subuh: '00:00',
    pagi: '08:00',
    siang: '12:00',
    sore: '16:00',
    magrib: '18:00',
    malam: '20:00',
    tengah_malam: '23:00',
}

let captku = ` - 々 *[ Update Anime-Kuronime ]* 々\n\n`
for (let i of latest) {
captku += `> ᴛɪᴛʟᴇ: ${i.title}\n`
captku += `> ᴜʀʟ: ${i.url}\n`
captku += `> ᴛʏᴘᴇ: ${i.type}\n`
captku += `> ꜱᴄᴏʀᴇ: ${i.score}\n\n`
}

for (let [anime, waktu] of Object.entries(jadwalanime)) {
if (timeNow === waktu) {
sock.autoanime[config.saluran2] = [

await sock.sendMessage(config.saluran2, {
text: captku,
contextInfo: {
      isForwarded: true,
     forwardingScore: 99999,
    externalAdReply: {
      showAdAttribution: true,
      title: 'AnimeKuronime By: Deku',
      mediaType: 1,
      previewType: 1,
      body: 'by: Deku',
      //previewType: "PHOTO",
      thumbnailUrl: 'https://files.catbox.moe/yy0w5l.jpg',
      renderLargerThumbnail: false,
      mediaUrl: config.linkch,
      sourceUrl: config.linkch
     },
      forwardedNewsletterMessageInfo: {
      newsletterJid: config.saluran,
      newsletterName: `By : ${config.ownername}`,
      serverMessageId: 143
    }
  }
})
]
}
}

}

}

module.export = { events }