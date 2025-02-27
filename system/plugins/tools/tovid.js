module.exports = {
  command: "tovideo",
  alias: ["tovid"],
  category: ["tools"],
  settings: {
    limit: true,
  },
  description: "Sticker To Video !",
  loading: true,
  async run(m, { sock, Func, Scraper }) {
    let q = m.quoted ? m.quoted : m;
    if (!/webp/.test(q.msg.mimetype) || !q.isMedia)
      throw `> Reply Pesan Sticker Nya`;
    let media = await q.download()

    const url = await Scraper.tovideo.convert(media)

    await sock.sendMessage(m.cht, { video: { url: url }, caption: `Sticker Convert To Video` }, { quoted: m })
  },
};