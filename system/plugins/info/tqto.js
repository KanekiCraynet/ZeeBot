const fs = require('node:fs')
  module.exports = {
  command: "tqto",
  alias: ["credit"],
  category: ["info"],
  description: "List Contrubutor bot ini",
  async run(m, { sock, config, Func }) {
    let cap = `*TERIMAKASIH KEPADA :*
Axel-Network: ( dev: sc nekobot )
Ndbotz: ( dev: scrape, sc )

My Friend
 =>  Xyroo
 =>  Ndbotz
 =>  Dafa
 =>  Verlang
 
  *[ Teman Main Mc ]*
 =>  Sulxz
 =>  Nero
 =>  Askar
 =>  xxelienx
 =>  biireal
 =>  Rusdi
 
Scrape: Ndbotz Daffa Selxyz Dll
Apikey: Rio Sanz Btch Dll
`;

await m.reply({
  document: fs.readFileSync("./image/doc.txt"),
fileName: Func.Styles(`Thank You To`),
mimetype: 'application/msword',
jpegThumbnail:await sock.resize(fs.readFileSync("./image/Hanako-replydoc.jpg"), 356, 200),
caption: cap,
contextInfo: {
      isForwarded: true,
     forwardingScore: 99999,
    forwardedNewsletterMessageInfo: {
        newsletterJid: config.saluran,
        serverMessageId: -1,
        newsletterName: `${Func.Styles(`Tqto By: ${config.ownername}`)}`,
       }
     }
    });
  },
};