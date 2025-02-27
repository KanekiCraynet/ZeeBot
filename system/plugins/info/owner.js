module.exports = {
  command: "owner",
  alias: ["pemilik"],
  category: ["info"],
  description: "List Owner Bot",
  async run(m, { sock, config }) {

const owner = config.owner
let list = []
for (let i of owner) {
list.push({
displayName: await sock.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await sock.getName(i + '@s.whatsapp.net')}\n
FN:${await sock.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:Tt: @leooxxzy\n
item2.X-ABLabel:Email\n
item3.URL:Youtube : Yuta\n
item3.X-ABLabel:Grup WangSaff\n
item4.ADR:;;Mars Area 51;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}

await sock.sendMessage(m.cht, { contacts: { displayName: `${list.length} Contact`, contacts: list } }, { quoted: m })
  },
};