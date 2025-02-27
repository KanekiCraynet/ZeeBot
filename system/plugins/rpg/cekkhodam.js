module.exports = {
command: "cekkhodam",
alias: ["ck", "ckh"],
category: ["rpg"],
    settings: {
    owner: false,
  },
description: "game rpg is not real",
loading: true,
async run(m, { sock, text }) {

const pickkondam = [
"Jomok", "Coli", "Karbit", "Kaos", "Suka Nonton Brutal Legends", "kontol", "suka nonton neko***", "penyuka loli😹", "suka nonton boy love", 
]
let oilahh = pickkondam[Math.floor(Math.random() * pickkondam.length)]

m.reply('Khodam Mu Adalah ' + oilahh)

}
}