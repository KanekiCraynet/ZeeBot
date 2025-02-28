module.exports = {
  command: "Instagram",
  alias: ["igdl", "ig", "igvideo", "igreel"],
  category: ["downloader"],
  settings: {
    limit: true,
  },
  description: "Mengunduh Reels/postingan Instagram",
  loading: true,
  async run(m, { sock, Func, text, Scraper }) {
    try {
      // Validasi input agar tidak salah alamat (seperti es krim yang salah rasa!)
      if (!text)
        throw `*– 乂 Cara Penggunaan :*
> *Masukkan atau balas pesan dengan link Instagram yang ingin diunduh*
> *Contoh :* ${m.prefix + m.command} https://www.instagram.com/reel/xxxxx/

*– 乂 Petunjuk :*
> Link yang valid hanya bisa berupa Postingan atau Reels dari Instagram.`;

      if (!/instagram\.com/.test(text))
        throw "*– 乂 Masukkan Link Instagram yang Valid :*\n> Pastikan link yang dimasukkan berasal dari Instagram.";

      // Ambil data dari Scraper (pastikan Scraper.Instagram mengembalikan objek dengan properti url dan metadata)
      let data = await Scraper.Instagram(text);
      if (!data || !data.url || !Array.isArray(data.url) || data.url.length === 0) {
        throw "> ❌ Gagal mengambil data Instagram. Silakan coba lagi atau periksa link yang Anda masukkan.";
      }

      // Siapkan caption berdasarkan metadata (agar informasi tertera jelas seperti label es krim favorit)
      let caption = `*– 乂 Instagram Downloader :*\n`;
      if (data.metadata) {
        caption += Object.entries(data.metadata)
          .map(([key, value]) => `> *- ${key.capitalize()} :* ${value}`)
          .join("\n");
      }

      // Proses pengunduhan untuk setiap URL yang ditemukan
      for (let videoUrl of data.url) {
        let res = await fetch(videoUrl);
        if (!res.ok) {
          throw `> ❌ Gagal mengunduh media dari URL: ${videoUrl}`;
        }
        // Konversi response ke buffer
        let buffer = Buffer.from(await res.arrayBuffer());
        // Kirim file dengan caption yang sudah disiapkan
        await sock.sendFile(m.cht, buffer, null, caption, m);
      }
    } catch (error) {
      console.error("Error dalam Instagram downloader:", error);
      m.reply(`> ❌ Terjadi error: ${error}`);
    }
  },
};
