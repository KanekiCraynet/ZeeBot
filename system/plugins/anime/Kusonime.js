module.exports = {
    command: "kusonime", //- Nama fitur nya
    alias: [ ], //- Short cut command
    category: ["anime"], //- Kategori Fitur 
    settings: {
        owner: false, //-  Apakah Fitur ini khusus owner ?
        group: false, // - Apakah Fitur ini khusus group ?
        limit: true,
        registered: true,
     },
    description: "Search Anime", //- Penjelasan tentang fitur nya
    loading: true, //- Ingin menambahkan loading messages ?
 async run(m, { sock, Func, Scraper, text, config }) {

if (!text) throw 'info nama anime pengen di cari'

const hasil = await Scraper.kusonime.search(text)

let no = 1

let deku = `*⏤͟͟͞͞╳ [ Kusonime ]*\n\n`
for (let i of hasil.data) {
deku += `*⏤͟͟͞͞╳ [ ${no++} ]*\n`
deku += `> ⏤͟͟͞͞╳ Title: ${i.title}\n`
deku += `> ⏤͟͟͞͞╳ Posted: ${i.postedBy}\n`
deku += `> ⏤͟͟͞͞╳ Releasetime: ${i.releaseTime}\n`
deku += `> ⏤͟͟͞͞╳ Link: ${i.link}\n`
deku += `⏤͟͟͞͞╳\n\n`
}

deku += `⏤͟͟͞͞╳`

m.reply({ image: { url: hasil.data[0].thumbnail }, caption: deku })

}
}