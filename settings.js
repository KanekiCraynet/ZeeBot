const fs = require('node:fs');
const path = require('node:path');

/**
 * Konfigurasi utama untuk ZeeBot WhatsApp
 * @type {Object}
 */
const config = {
    // [SECTION] - Bot Information
    name: "ʜᴀɴᴀᴋᴏ-ᴋᴜɴ-ʙᴏᴛᴢ",
    tz: "Asia/Jakarta",
    sessions: path.join(__dirname, 'sessions'),
    database: "hanako-db",

    // [SECTION] - Ownership
    owner: ["6285742719456"],  // Nomor owner dalam format internasional tanpa +
    ownername: 'ʟᴇᴏᴏxᴢʏ',
    ownername2: 'ᴅᴇᴋᴜ',

    // [SECTION] - Message Configuration
    prefix: [".", "?", "!", "/", "#"], // Prefix tambahkan dengan pemisah koma
    wwagc: '~',  // Prefix untuk command group
    
    // [SECTION] - Group/Channel Settings
    jidgroup: '@g.us',
    jidgroupnotif: '@g.us',
    saluran: '@newsletter',
    saluran2: '@newsletter',
    wach: '',  // ID WhatsApp Channel (jika ada)

    // [SECTION] - Sticker Settings
    sticker: {
        packname: "〆 ʜᴀɴᴀᴋᴏ-ᴋᴜɴ-ʙᴏᴛᴢ",
        author: "ʙʏ: ᴅᴇᴋᴜ/ʟᴇᴏᴏxᴢʏ 〆"
    },

    // [SECTION] - System Messages
    messages: {
        wait: "*( Loading )* Tunggu Sebentar...",
        owner: "*( Denied )* Perintah ini hanya untuk Owner!",
        premium: "*( Denied )* Fitur ini khusus user premium",
        group: "*( Denied )* Command hanya bisa digunakan di group",
        botAdmin: "*( Denied )* Bot harus menjadi admin untuk eksekusi command ini",
        grootbotbup: "*( Denied )* Jadikan bot sebagai admin terlebih dahulu",
    }
};

module.exports = config;

// [SECTION] - Config File Watcher
const configPath = path.resolve(__filename);
fs.watch(configPath, (eventType) => {
    if (eventType === 'change') {
        console.log('[CONFIG] Perubahan terdeteksi, reloading config...');
        delete require.cache[require.resolve(configPath)];
    }
});