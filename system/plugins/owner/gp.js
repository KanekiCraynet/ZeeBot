const fs = require("node:fs");

module.exports = {
  command: "getplugin",
  category: ["owner"],
  alias: ["gp", "ambilfitur"],
  usage: "filename/number",
  description: "untuk mengambil fitur bot",
  settings: {
    owner: true,
  },
  async run(m, { sock, text, config }) {
    const thumb = await sock
      .profilePictureUrl(m.sender, "image")
      .catch((e) => "https://files.catbox.moe/8getyg.jpg");
    let ListPlugins = Object.keys(pg.plugins).map(
      (a) => a.split("/plugins/")[1],
    );
    if (!text)
      throw `> Masukan Nama File atau masukan nomor sesuai list dibawah ini : 

*– List Plugins ( ${ListPlugins.length} Files ) :*
${ListPlugins.map((a, i) => `> *${i + 1}.* ${a}`).join("\n")}`;
    m.reply(config.messages.wait);
    if (isNaN(text)) {
      if (!fs.existsSync(process.cwd() + "/system/plugins/" + text))
        throw `> Masukan Nama File atau masukan nomor sesuai list dibawah ini : 

*– List Plugins ( ${ListPlugins.length} Files ) :*
${ListPlugins.map((a, i) => `> *${i + 1}.* ${a}`).join("\n")}`;
      m.reply({
        document: fs.readFileSync(process.cwd() + "/system/plugins/" + text),
        fileName: text,
        jpegThumbnail: await sock.resize(thumb, 200, 200),
        mimetype: "application/javascript",
        caption: fs
          .readFileSync(
            process.cwd() + "/system/plugins/" + ListPlugins[text - 1],
          )
          .toString(),
      });
    } else {
      if (
        !fs.existsSync(
          process.cwd() + "/system/plugins/" + ListPlugins[text - 1],
        )
      )
        throw `> Masukan Nama File atau masukan nomor sesuai list dibawah ini : 

*– List Plugins ( ${ListPlugins.length} Files ) :*
${ListPlugins.map((a, i) => `> *${i + 1}.* ${a}`).join("\n")}`;
      const thumb = await sock
        .profilePictureUrl(m.sender, "image")
        .catch((e) => "https://files.catbox.moe/8getyg.jpg");
      m.reply({
        document: fs.readFileSync(
          process.cwd() + "/system/plugins/" + ListPlugins[text - 1],
        ),
        fileName: ListPlugins[text - 1],
        jpegThumbnail: await sock.resize(thumb, 200, 200),
        mimetype: "application/javascript",
        caption: fs
          .readFileSync(
            process.cwd() + "/system/plugins/" + ListPlugins[text - 1],
          )
          .toString(),
      });
    }
  },
};
