module.exports = {
  command: "mute",
  alias: [ ],
  category: ["group"],
 description: "Untuk hidetag grup",
  async run(m, { sock, text }) {
if (!text) return m.reply({
        poll: {
          name: `*– 乂 Cara Penggunaan*
> *\`0\`* Untuk mematikan fitur ${m.prefix}mute off
> *\`1\`* Untuk menghidupkan fitur ${m.prefix}mute on`,
          values: [`${m.prefix}mute on`, `${m.prefix}mute off`],
          selectableCount: 1,
        },
      });
const args = m.args
 if (!m.isGroup) throw 'maaf khusus group'
 if (!m.isOwner && !m.isAdmin) throw 'maaf command ini bisa nya ke admin and owner'

if (args[0] === 'off') {
db.list().group[m.metadata.id].mute = false
m.reply('Oke Fitur Mute Udah Nonaktifkan')
} else if (args[0] === 'on') {
db.list().group[m.metadata.id].mute = true
m.reply('Oke Fitur Mute Udah Aktif')
} else {
     m.reply({
        poll: {
          name: `*– 乂 Cara Penggunaan*
> *\`0\`* Untuk mematikan fitur ${m.prefix}mute off
> *\`1\`* Untuk menghidupkan fitur ${m.prefix}mute on`,
          values: [`${m.prefix}mute on`, `${m.prefix}mute off`],
          selectableCount: 1,
        },
      });
    }
 }
}