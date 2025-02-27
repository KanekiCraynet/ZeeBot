const axios = require('axios');
const cheerio = require('cheerio');

async function events(m, { sock, Func, config }) {

const datek = new Date((new Date).toLocaleString("en-US", { timeZone: "Asia/Jakarta" }))
const hours = datek.getHours()
const minutes = datek.getMinutes()
const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`

/*
*[!] SCRAPER LIVECHART*
👤 *author* : celci/catozolala
 📮 *wm* : https://whatsapp.com/channel/0029VaVKIxBKQuJK32uAi33W
// wm sama author jangan di hapus
*/

async function livechartlatest() {
return new Promise((resolve, reject) => {
const abc = "https://www.livechart.me"
try {
     axios.get(abc).then(({data}) => {
  const $ = cheerio.load(data)
  const catoz = [];
  
  $('div[class="anime-card"]').each((a, b) => {
  const o = $(b).find("img").attr("src")
  const g = $(b).find("img").attr("alt")
  const x = $(b).find(".poster-container").children(".episode-countdown").text()
  const m = $(b).find('.anime-info').children(".anime-studios").text()
  const h = $(b).find(".anime-synopsis").text()
  const j = $(b).find(".anime-extras").text()
  const w = $(b).find(".anime-info").text()
  const f = $(b).find(".anime-tags li").map((i, el) => $(el).text()).get().join(" ")
  const q = "scraper-by catozolala"
  const u = $(b).find(`h3.main-title`).children("a").attr('href')
  
  catoz.push({
  author: q,
  image: o,
  title: g,
  eps: x,
  studio: m,
  synopsis: h,
  bintang: j,
  inforilis: w,
  tags: f,
  link: abc+u
  })
  })
  resolve(catoz)
}) 

} catch (error) {
    console.error('Error:', error);
  }

 })
 
}

if (db.list().settings.livechart) {

sock.autolivech = sock.autolivech ? sock.autolivech : {}
if (config.saluran2 in sock.autolivech) {
    return false
}
let jadwallivech = {
    subuh: '01:00',
    pagi: '10:00',
    siang: '13:00',
    sore: '16:50',
    magrib: '18:50',
    malam: '20:50',
    tengah_malam: '00:50',
}
const woidep = await livechartlatest()
let deku = `⏤͟͟͞͞╳── *[ ᴜᴘᴅᴀᴛᴇ ᴀɴɪᴍᴇ ʟɪᴠᴇᴄʜᴀʀᴛ ]* ── .々─ᯤ\n│ `
for (let i of woidep) {
deku += `\n⏤͟͟͞͞╳── *[ ${i.title} ]* ── .々─ᯤ\n`
deku += `│    =〆 ᴇᴘɪsᴏᴅᴇ: ${i.eps}\n`
deku += `│    =〆 ᴅᴇᴠ: ${i.studio}\n`
deku += `│    =〆 ᴛᴀɢ: ${i.tags}\n`
deku += `│    =〆 ʟɪɴᴋ: ${i.link}\n`
deku += `⏤͟͟͞͞╳────────── .✦\n\n`
}
for (let [anime, waktu] of Object.entries(jadwallivech)) {
if (timeNow === waktu) {
sock.autolivech[config.saluran2] = [

await sock.sendMessage(config.saluran2, {
text: deku,
contextInfo: {
      isForwarded: true,
     forwardingScore: 99999,
    externalAdReply: {
      showAdAttribution: true,
      title: 'Livechart Up By: Deku',
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
}, {  })
]
}
}

}

}

module.exports = { events }