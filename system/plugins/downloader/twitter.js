module.exports = {
    command: "twitter", //- Nama fitur nya
    alias: ["twdl", "tw", "xdl"], //- Short cut command
    category: ["downloader"], //- Kategori Fitur 
    settings: {
       limit: true,
     },
    description: "Downloader Twitter", //- Penjelasan tentang fitur nya
    loading: true, //- Ingin menambahkan loading messages ?
 async run(m, { sock, Func, Scraper, text, config }) {

if (!text.includes('twitter') && !text.includes('x.com')) throw "Link Contoh .twitter <link>";
const result = await Scraper.twitter.dl(text)

let deku = `*[ Downloader - Twitter ]*\n`
deku += `> title: ${result.title}\n`
deku += `> duration: ${result.duration}\n`
deku += `> twitterId: ${result.twitterId}\n`
deku += `*Lagi Di Proses Di Tunggu Wkwk*`

await m.reply({ image: { url: result.videoThumbnail }, caption: deku })

await m.reply({ video: { url: result.downloads[0].url }, caption: 'Done' })

await m.reply({ audio: { url: result.downloads[0].url }, mimetype: 'audio/mpeg', fileName: result.title })
}
}