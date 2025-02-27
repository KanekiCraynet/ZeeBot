/**
*[ Fitur convert kata kata ke enchanting table ]*
gada wm wm an😐
**/

module.exports = {
    command: "toenchant", //- Nama fitur nya
    alias: [ "tc" ], //- Short cut command
    category: ["tools"], //- Kategori Fitur 
    settings: {
        owner: false, //-  Apakah Fitur ini khusus owner ?
        group: false, // - Apakah Fitur ini khusus group ?
        limit: true,
     },
    description: "text biasa to enchanted mc", //- Penjelasan tentang fitur nya
    loading: true, //- Ingin menambahkan loading messages ?
 async run(m, { sock, Func, Scraper, text, config }) {
/*
const handle = {
  miyxious: ["toenchant", "tc"],
  category: "#tools",
  describe: "Mengconvert bahasa kita ke bahasa enchanting table minecraft",
  run: async (m, { q, repl, text, Func }) => {
*/
    try {
      const charMap = {
        a: "ᔑ",
        b: "ʖ",
        c: "ᓵ",
        d: "↸",
        e: "ᒷ",
        f: "⎓",
        g: "⊣",
        h: "⍑",
        i: "╎",
        j: "⋮",
        k: "ꖌ",
        l: "ꖎ",
        m: "ᒲ",
        n: "リ",
        o: "𝙹",
        p: "!¡",
        q: "ᑑ",
        r: "∷",
        s: "ᓭ",
        t: "ℸ ̣",
        u: "⚍",
        v: "⍊",
        w: "∴",
        x: "̇/",
        y: "||",
        z: "⨅"
      }
      if (!text || typeof text !== "string") return m.reply("Harap masukkan teks yang ingin convert!")
      const convertToEnchant = async (text) => {
        return new Promise((resolve) => {
          const result = text
            .toLowerCase()
            .split("")
            .map((char) => charMap[char] || char)
            .join("")
          resolve(result)
        })
      }
      const loli = await convertToEnchant(text)
      return m.reply(`*Input:*\n${text}\n\n*Hasil convert:*\n${loli}`)
    } catch (err) {
     m.reply("maaf eror.. " + err)
    }
  }
}

//export default handle