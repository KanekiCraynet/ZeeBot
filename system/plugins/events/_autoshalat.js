async function events(m, { sock, Func, config }) {

sock.autoshalat = sock.autoshalat ? sock.autoshalat : {}
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? sock.user.id : m.sender
let id = m.cht 
if (id in sock.autoshalat) {
    return false
}
let jadwalSholat = {
    shubuh: '04:39',
    terbit: '05:44',
    dhuha: '06:02',
    dzuhur: '12:02',
    ashar: '15:15',
    magrib: '17:52',
    isya: '19:01',
}
const datek = new Date((new Date).toLocaleString("en-US", { timeZone: "Asia/Jakarta" }))
const hours = datek.getHours()
const minutes = datek.getMinutes()
const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
for (let [sholat, waktu] of Object.entries(jadwalSholat)) {
if (timeNow === waktu) {
sock.autoshalat[id] = [
sock.sendMessage(m.cht, {
audio: {
url: 'https://media.vocaroo.com/mp3/1ofLT2YUJAjQ'
},
mimetype: 'audio/mp4',
ptt: true,
contextInfo: {

/*
groupMentions: [
  {
   groupJid: m.cht,
  },
],
*/

externalAdReply: {
showAdAttribution: true,
mediaType: 1,
mediaUrl: '',
title: `Selamat menunaikan Ibadah Sholat ${sholat}`,
body: `🕑 ${waktu}`,
sourceUrl: '',
thumbnailUrl: "https://files.catbox.moe/3qyn5w.png",
renderLargerThumbnail: true
}
}
}, {
quoted: m
}),
setTimeout(async () => {
delete sock.autoshalat[m.cht]
}, 57000)
]
}
}
}

module.exports = { events }