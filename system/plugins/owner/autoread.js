module.exports = {
command: "autoread",
alias: [ ],
category: ["owner"],
    settings: {
    owner: true,
  },
description: "autoread",
loading: true,
async run(m, { sock, text }) {

const args = m.args

if (!text) throw 'mau pilih yang mana on? or off?'

if (args[0] === "off") {
 db.list().settings.online = false
 m.reply('oke udah di offin')
} else if (args[0] === "on") {
 db.list().settings.online = false
 m.reply('oke udah di offin')
}

}
}