module.exports = {
    command: "walpaper", //- Nama fitur nya
    alias: ["uphd", "uphdwal"], //- Short cut command
    category: ["downloader"], //- Kategori Fitur 
    settings: {
      limit: true,
     },
    description: "Mencari Wallpaper Yang Ingin Kalian Cari", //- Penjelasan tentang fitur nya
    loading: true, //- Ingin menambahkan loading messages ?
 async run(m, { sock, Func, Scraper, text, config }) {
    if (!text) throw 'mau nyari wallpaper nama apa?'
    const wallpaperhd = await Scraper.uphd.uphds(text)

    let pickget = wallpaperhd[Math.floor(Math.random() * wallpaperhd.length)]

    let deku = `*[ Wallpaper - UpHd ]*\n\n`
    deku += `> title: ${pickget.title}\n`
    deku += `> resolution: ${pickget.resolution}\n`
    deku += `> link: ${pickget.link}\n\n`
    deku += `*Done Ya Bang*`

    m.reply({ image: { url: pickget.imageUrl }, caption: deku })
  }
}