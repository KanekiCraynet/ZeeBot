module.exports = {
  command: "toimg",
  alias: ["tofoto", "toimage"],
  category: ["tools"],
  settings: {
    limit: true,
  },
  description: "Sticker To Image !",
  loading: true,
  async run(m, { sock, Func }) {
    let q = m.quoted ? m.quoted : m;
    if (!/webp/.test(q.msg.mimetype) || !q.isMedia)
      throw `> Reply Pesan Sticker Nya`;
      m.reply({ image: await m.quoted.download(), caption: 'Nih Toimg' })
  },
};