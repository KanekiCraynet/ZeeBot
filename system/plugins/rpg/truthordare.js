module.exports = {
command: "truthordare",
alias: ["truth", "dare"],
category: ["rpg"],
    settings: {
    owner: false,
  },
description: "game rpg is not real",
loading: true,
async run(m, { sock, text }) {

const args = m.args
if (!text) return sock.sendMessage(m.cht, {
  text: `Mau Pilih Yang Mana`,
  footer: "by: deku vigilante",
  buttons: [
  {
    buttonId: ".truthordare truth", 
    buttonText: {
      displayText: 'Truth'
    }
  }, {
    buttonId: ".truthordare dare", 
    buttonText: {
      displayText: 'Dare'
    }
  }
],
  viewOnce: true,
  headerType: 6,
}, { quoted: m });

if (args[0] === 'dare') {
const Tantangandare = [
"ungkapi rahasia lu berani ga?",
"Nonton Yosuga No Sora Ampe Begadang", "Sholat Magrib",
"Cium pipi sahabat lu kalo berani"
]
let oilah = Tantangandare[Math.floor(Math.random() * Tantangandare.length)]

m.reply(oilah)

} else if (args[0] === 'truth') {
const Tantangantruth = [
"Mau Curhat? Sini Curhat Aja Bg pasti bakal gw bantu",
"Ada Masalah Apa? Sini Curhat", "Apakah Anda Di tolak Ama pacar? Cerita sini",
"Ada Sahabat lu lagi ngejahatin lu? Curhat sini"
]
let oilahh = Tantangantruth[Math.floor(Math.random() * Tantangantruth.length)]

m.reply(oilahh)
}

}
}