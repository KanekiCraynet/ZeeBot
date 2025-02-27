module.exports = {
  command: "totag",
  alias: ["ttg", "replytag"],
  category: ["group"],
 description: "Untuk totag grup",
  async run(m, { sock }) {
  if (!m.isGroup) throw 'maaf khusus group'
  if (!m.isOwner && !m.isAdmin) throw 'maaf command ini bisa nya ke admin and owner'
  if (!m.quoted) return m.reply('reply pesan nya')
  await sock.sendMessage(m.cht, { forward: m.quoted, mentions: m.metadata.participants.map(a => a.id) })
 }
}