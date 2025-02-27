module.exports = {
  command: "self",
  alias: [],
  category: ["owner"],
  settings: {
    owner: true,
  },
  description: "Ubah bot menjadi mode senyap",
  async run(m, { sock, text }) {
  const args = m.args
    if (!text)
      return m.reply({
        poll: {
          name: `*– 乂 Cara Penggunaan*
> *\`0\`* Untuk mematikan fitur self
> *\`1\`* Untuk menghidupkan fitur self`,
          values: [`${m.prefix}self 0`, `${m.prefix}self 1`],
          selectableCount: 1,
        },
      });
     if (args[0] === '0') {
      db.list().settings.self = false
      m.reply('Self Di Matikan')
     } else if (args[0] === '1') {
      db.list().settings.self = true
      m.reply('Self Di Aktifkan')
    }
    
  } 
};