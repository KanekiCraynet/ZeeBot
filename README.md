

---

***ZeeBot | 1.0.0*** | ***Created by: KanekiCraynet || Base: Terinspirasi dari HanakoBotz, tapi dengan sentuhan masa depan yang berbeda***

![Logo ZeeBot](https://files.catbox.moe/movzsb.jpg)  

***By Creator:***  
![Logo Creator](https://files.catbox.moe/nogonh.png)

```bash
> Simple WhatsApp Bot menggunakan Library Baileys dengan inovasi terkini
```

---

### Contoh Output Pesan

```javascript
{
  message: Message { conversation: '>_ Selamat datang di ZeeBot' },
  type: 'conversation',
  msg: '>_ Selamat datang di ZeeBot',
  isMedia: false,
  key: {
    remoteJid: '628123456789@s.whatsapp.net',
    participant: '628123456789@s.whatsapp.net',
    fromMe: false,
    id: 'A1B2C3D4E5F6'
  },
  cht: '628123456789@s.whatsapp.net',
  fromMe: false,
  id: 'A1B2C3D4E5F6',
  device: 'android',
  isBot: false,
  isGroup: false,
  participant: '628123456789@s.whatsapp.net',
  sender: '628123456789@s.whatsapp.net',
  mentions: [],
  body: '>_ Selamat datang di ZeeBot',
  prefix: '',
  command: '>_',
  args: [ 'Selamat', 'datang', 'di', 'ZeeBot' ],
  text: 'Selamat datang di ZeeBot',
  isOwner: true,
  download: [AsyncFunction (anonymous)]
}
```

---

## ⚙️ Pengaturan Bot (**settings.js**)

```javascript
const config = {
    owner: ["628123456789"],
    name: "ᴢᴇᴇ-ʙᴏᴛ", 
    ownername: 'KanekiCraynet',
    ownername2: 'Zee Master',
    prefix: [".", "?", "!", "/", "#"], // Tambahkan prefix lain jika diperlukan
    wwagc: 'https://chat.whatsapp.com/YourChatGroupLink',
    saluran: '120363279195205552@newsletter', 
    jidgroupnotif: '120363266755712733@g.us', 
    saluran2: '120363335701540699@newsletter', 
    jidgroup: '120363267102694949@g.us', 
    wach: 'https://whatsapp.com/channel/YourChannelLink', 
    sessions: "sessions",
    sticker: {
      packname: "〆 ZeeBot",
      author: "By: KanekiCraynet"
    },
    messages: {
      wait: "*( Sedang memproses )* Harap tunggu sebentar...",
      owner: "*( Akses Ditolak )* Kamu bukan pemilik bot!",
      premium: "*( Akses Ditolak )* Fitur ini khusus untuk pengguna premium.",
      group: "*( Akses Ditolak )* Fitur ini hanya dapat digunakan dalam grup.",
      botAdmin: "*( Akses Ditolak )* Bot harus menjadi admin terlebih dahulu.",
      error: "*( Error )* Terjadi kesalahan. Silakan coba lagi."
    },
    database: "zeebot-db",
    tz: "Asia/Jakarta"
}

module.exports = config
```

---

## 👨‍💻 Cara Install/Run

Untuk menjalankan ZeeBot, ikuti langkah berikut (lebih simpel dari resep rahasia nenek, namun sama efektifnya):

```bash
$ git clone https://github.com/KanekiCraynet/ZeeBot
$ cd ZeeBot
$ npm install
$ npm start
```

---

## ☘️ Contoh Fitur

Berikut adalah cara menambahkan fitur baru ke ZeeBot:

### 1. Plugins

```javascript
module.exports = {
    command: "tes", // Nama fitur
    alias: ["testbot", "cekbot"], // Alias command
    category: ["utility"], // Kategori fitur
    settings: {
        owner: false, // Apakah fitur ini khusus untuk owner?
        group: false, // Apakah fitur ini khusus untuk grup?
    },
    description: "Tes keaktifan ZeeBot", // Deskripsi fitur
    loading: true, // Menggunakan pesan loading?
    async run(m, { sock, client, conn, text, config }) {
      m.reply("> Bot ZeeBot aktif dan siap digunakan!")
    }
}
```

### 2. Penggunaan Kasus (Case)

```javascript
case "tes" : {
    m.reply("> Bot ZeeBot aktif dan siap digunakan!")
}
break
```

---

## 📢 Jangan Lupa untuk Follow Channel dan Join Group

Meskipun ZeeBot kini tampil dengan wajah baru, dukungan komunitas tetap krusial. Bergabunglah dengan channel dan grup kami untuk update terbaru, diskusi, dan tentu saja, candaan santai ala developer!

**Channel Utama: [Your Channel Link]**  
**Grup Diskusi: [Your Group Link]**

---
