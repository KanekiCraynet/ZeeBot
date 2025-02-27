module.exports = {
   command: "bet",
   alias: ["taruhan"],
   category: ["game"],
   settings: {},
   async run(m, { sock }) {
      let usr = db.list().user[m.sender];
      const bet = parseInt(m.text.split(' ')[1]);
      
      if (usr.isTebak) {
         const userGuess = parseInt(m.text);
         if (isNaN(userGuess) || userGuess < 1 || userGuess > 5) return;
         
         const storedBet = usr.currentBet;
         const storedNumber = usr.correctNumber;
         
         usr.isTebak = false;
         usr.currentBet = 0;
         usr.correctNumber = 0;
         
         if (userGuess === storedNumber) {
            const winAmount = Math.floor(storedBet * 1.5);
            usr.rpg.money += winAmount;
            
            let winMsg = `🎉 *SELAMAT!*\n\n`;
            winMsg += `• Angka yang benar: ${storedNumber}\n`;
            winMsg += `• Tebakanmu: ${userGuess}\n`;
            winMsg += `• Hadiah: +$${(storedBet * 0.5).toLocaleString()}\n`;
            winMsg += `• Total: $${winAmount.toLocaleString()}`;
            
            m.reply(winMsg);
         } else {
            const loseAmount = Math.floor(storedBet * 0.1);
            usr.rpg.money -= loseAmount;
            
            let loseMsg = `❌ *KALAH!*\n\n`;
            loseMsg += `• Angka yang benar: ${storedNumber}\n`;
            loseMsg += `• Tebakanmu: ${userGuess}\n`;
            loseMsg += `• Denda: -$${loseAmount.toLocaleString()}\n`;
            loseMsg += `• Total Kerugian: $${(storedBet + loseAmount).toLocaleString()}`;
            
            m.reply(loseMsg);
         }
         
         db.list().user[m.sender] = usr;
         return;
      }

      if (!bet || isNaN(bet)) {
         return m.reply('❌ Format salah!\n\nContoh: .bet 50000');
      }
      
      if (bet < 10000) {
         return m.reply('❌ Minimal taruhan adalah 10,000!');
      }
      
      if (bet > usr.rpg.money) {
         return m.reply('❌ Uang kamu tidak cukup untuk bertaruh!');
      }
      
      const correctNumber = Math.floor(Math.random() * 5) + 1;
      
      usr.isTebak = true;
      usr.currentBet = bet;
      usr.correctNumber = correctNumber;
      usr.rpg.money -= bet;
      
      db.list().user[m.sender] = usr;
      
      let msg = `🎲 *TEBAK ANGKA*\n\n`;
      msg += `• Taruhan: $${bet.toLocaleString()}\n`;
      msg += `• Tebak angka dari 1-5\n`;
      msg += `• Waktu: 120 detik\n\n`;
      msg += `• Hadiah Menang: +50% ($${(bet * 0.5).toLocaleString()})\n`;
      msg += `• Denda Kalah: -10% ($${(bet * 0.1).toLocaleString()})\n\n`;
      msg += `Ketik *angka* untuk menebak!`;
      
      m.reply(msg);
      
      setTimeout(() => {
         if (usr.isTebak) {
            usr.isTebak = false;
            usr.rpg.money -= Math.floor(bet * 0.1);
            db.list().user[m.sender] = usr;
            
            m.reply(`⏰ Waktu habis!\nJawaban yang benar adalah: ${correctNumber}\nKamu kehilangan: $${(bet * 0.1).toLocaleString()}`);
         }
      }, 120000);
   }
}