module.exports = {
    command: "getpp", //- Nama fitur nya
    alias: ["getppwa", "getprofile"], //- Short cut command
    category: ["main"], //- Kategori Fitur 
    settings: {
        owner: false, //-  Apakah Fitur ini khusus owner ?
        group: false, // - Apakah Fitur ini khusus group ?
        limit: true, // - Pakai Limit
     },
    description: "Mendapatkan pp orang", //- Penjelasan tentang fitur nya
    loading: true, //- Ingin menambahkan loading messages ?
 async run(m, { sock, Func, Scraper, text, config }) {
    if (!m.quoted) throw 'reply pesan kalau mau getpp'
    const getpp = await sock.profilePictureUrl(m.quoted.sender, 'image')

    m.reply({ image: { url: getpp }, caption: 'nih kak' })
  }
}