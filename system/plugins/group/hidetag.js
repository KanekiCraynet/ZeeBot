module.exports = {
  command: "hidetag",
  alias: ["h", "tagtext"],
  category: ["group"],
 description: "Untuk hidetag grup",
  async run(m, { sock, text }) {
 if (!m.isGroup) throw 'maaf khusus group'
 if (!m.isOwner && !m.isAdmin) throw 'maaf command ini bisa nya ke admin and owner'
  const groupMetadata = m.isGroup ? await sock.groupMetadata(m.cht).catch(e => {}) : ''
  const participants = m.isGroup ? await groupMetadata.participants : ''
await sock.sendMessage(m.cht, { text : text ? text : '' , mentions: participants.map(a => a.id)}, { quoted: m })
 }
}