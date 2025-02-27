module.exports = {
   command: "ngewe",
   alias: ["anu"],
   category: ["rpg"],
   settings: {},
   async run(m, { sock, config, Scraper }) {
      if (!db.list().user[m.sender].premium.status == true) throw 'maaf anda harus premium dulu😏'
      let usr = db.list().user[m.sender];
      if (!usr || !usr.rpg) {
         return m.reply("Data RPG tidak ditemukan. Silakan mulai permainan terlebih dahulu.");
      }

      let rpg = usr.rpg;

      let lastTaxy = rpg.lastTaxy || 0;
      let now = Date.now();
      let cooldown = 14400000; 
      
      if (now - lastTaxy < cooldown) {
         let timeLeft = Math.ceil((cooldown - (now - lastTaxy)) / 1000);
         return m.reply(`Tunggu ${timeLeft} detik sebelum kamu dapat menggunakan ${m.command} lagi.`);
      }
      let prosesTaksi = [
         "Mencari pelanggan🔍",
         `Anda Menemukan Pelanggan`,
         `🥵 Ah~`,
         `Ah ah~`,
         `Uhmmm yamete~ ~ Crot Keluar Cairan putih putih`,
          `🥵 ahhhhhh~`
      ];
      for (let txt of prosesTaksi) {
         await m.reply(txt);
         await sleep(7000);
      }

      let random = Math.floor(Math.random() * (500000 - 100000 + 1)) + 100000;
      let randomExp = Math.floor(Math.random() * 50000) + 1;
      let dapatMoney = random;
      let dapatExp = randomExp;
      rpg.money += dapatMoney;
      rpg.exp += dapatExp;

      let hasilNyaTxt = `
💼 *Perjalanan Selesai!*
━━━━━━━━━━━━━━━━━
💵 *Gaji Diterima:* +${dapatMoney.toLocaleString()} uang  
🎯 *Pengalaman:* +${dapatExp.toLocaleString()} exp  
━━━━━━━━━━━━━━━━━
🚀 Teruslah bekerja keras dan kumpulkan lebih banyak gaji!
`.trim();

      rpg.lastTaxy = now;

      return m.reply({
         text: hasilNyaTxt,
         footer: `${await Scraper.func.Styles(`${config.name} Bot By ${config.ownername}`)}`,
         buttons: [
            {
               buttonId: ".menu",
               buttonText: { displayText: "Back To Menu" }
            }
         ],
         viewOnce: true,
         headerType: 4
      });
   }
}

function sleep(ms) {
   return new Promise(resolve => {
      setTimeout(resolve, ms);
   });
}
