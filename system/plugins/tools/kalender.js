const moment = require('moment-timezone')
const ytime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
const ydate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
const time2 = moment().tz('Asia/Kolkata').format('HH:mm:ss')

class Command {
    constructor() {
        this.command = "kalender"
        this.alias = ["calendar", "libur"]
        this.category = ["tools"]
        this.settings = {
            limit: true
        }
        this.description = "Cek Hari libur tahun ini"
        this.loading = true
    }
    run = async (m, {
        sock,
        Func,
        Scraper,
        config,
        store
    }) => {
 
var date = new Date((new Date).toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));

var detik1 = date.toLocaleTimeString('id', {second: '2-digit'});
var menit1 = date.toLocaleTimeString('id', {minute: '2-digit'});
var jam1 = date.toLocaleTimeString('id', {hour: '2-digit'});

    const bulan1 = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    const hari1 = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum’at','Sabtu'];
    const op1 = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'];

    var hariini = date.getDay(),
    hari = hari1[hariini];

    var tanggal = date.getDate();
    
    var bulanini = date.getMonth(),
    bulan = bulan1[bulanini];
    
    var tahun = date.getFullYear();
    
    var detikk = date.getSeconds(),
    detikNow = op1[detikk];
    
    var menitt = date.getMinutes(),
    menitNow = op1[menitt];

  let dekutgl = `⏤͟͟͞͞╳── *[ ᴄᴀʟᴇɴᴅᴇʀ ]* ── .々─ᯤ
│    =〆 ʜᴀʀɪ: ${hari}
│    =〆 ᴛᴀɴɢɢᴀʟ: ${tanggal}
│    =〆 ʙᴜʟᴀɴ: ${bulan}
│    =〆 ᴛᴀʜᴜɴ: ${tahun}
│    =〆 ᴅᴇᴛɪᴋ: ${detikNow}
│    =〆 ᴍᴇɴɪᴛ: ${menitNow}
⏤͟͟͞͞╳────────── .✦`

await m.reply({
  image: { url: 'https://fgsi-kalender.hf.space' },
  caption: dekutgl,
  footer: config.ownername,
  viewOnce: true,
  headerType: 6,
  buttons: [
  {
    buttonId: `.menu`, 
       buttonText: {
         displayText: "Back To Menu"
            }
           }
         ]
      })
    }
}

module.exports = new Command();