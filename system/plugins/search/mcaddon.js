module.exports = {
    command: "mcaddon", //- Nama fitur nya
    alias: ["add-on"], //- Short cut command
    category: ["search"], //- Kategori Fitur 
    settings: {
        owner: false, //-  Apakah Fitur ini khusus owner ?
        group: false, // - Apakah Fitur ini khusus group ?
     },
    description: "Search + Detail Addon", //- Penjelasan tentang fitur nya
    loading: true, //- Ingin menambahkan loading messages ?
 async run(m, { sock, Func, Scraper, text, config }) {
if(!text) throw `\`<!>\` Anda Mau Apa Link Or Search\n\n contoh:\nsearch: .mcaddon my hero academia\\tags\nlink: .pixiv https://mmcreviews.com/xxxxx`

if (/mmcreviews.com/.test(text)) {
const detail = await Scraper.mcaddon.detailAddons(text)

let dekuu = `${await Scraper.func.Styles(`⏤͟͟͞͞╳── *[ Add-on - Search ]* ── .々─ᯤ
│    =〆 ᴛɪᴛʟᴇ: ${detail.title}
│    =〆 subtitle: ${detail.subtitle}
│    =〆 rating: ${detail.gameplay}`)}
 ⏤͟͟͞͞╳────────── .✦`

m.replykontak(dekuu)
} else {

const search = await Scraper.mcaddon.addons(text)

if (search === 0) {
 m.reply('maaf yang anda search tidak di temukan....')
}

let no = 1
let noo = 1
let dekuu = `${await Scraper.func.Styles(`⏤͟͟͞͞╳── *[ Add-on - Search ]* ── .々─ᯤ`)}\n\n`
for (let i of search) {
dekuu += `${await Scraper.func.Styles(`⏤͟͟͞͞╳── *[ ${noo++} ]* ── .々─ᯤ
│    =〆 ᴛɪᴛʟᴇ: ${i.title}
│    =〆 description: ${i.description}
│    =〆 rating: ${i.rating}
│    =〆 link:`)} ${i.link}
 ⏤͟͟͞͞╳────────── .✦\n\n`
}
  dekuu += `⏤͟͟͞͞╳────────── .✦`

sock.sendButtonMessage(m.cht, [{
        type: 'list',
        title: "Click Here",
        value: [{
          headers: "search",
          rows: search.map((a, i) => ({
             title: `${no++} | ${a.title}`,
             command: `${m.prefix}mcaddon ${a.link}`  ,
             body: a.tags.map(v => v)
          }         
        ))
       }]
     }], m, { url: search[0].thumbnail, body: dekuu, footer: config.name });
}

}
}