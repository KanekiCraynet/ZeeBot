const color = require("chalk");

module.exports = (m) => {
  let info = "";
  info += color.white(`╭╌╌╌╌ ${color.black(color.bgBlackBright(`[ Chat Information ]`))}\n`);
  info += color.white(
    `│ Dari : ${(m.isGroup ? "Group Chat" : "Private Chat")}\n`,
  );
  if (m.isGroup) {
    info += color.white(
      `│ Subject : ${color.blackBright(m.metadata.subject)}\n`,
    );
    info += color.white(`│ Tipe : ${color.blackBright(m.type)}\n`);
    info += color.white(`│ Nama : ${color.blackBright(m.pushName)}\n`);
  } else {
    info += color.white(`│ Tipe : ${color.blackBright(m.type)}\n`);
    info += color.white(`│ Nama : ${color.blackBright(m.pushName)}\n`);
  }
  info += color.white(`│ Pesan : ${color.blackBright(m.body.startsWith(m.body) ? color.blackBright(m.body) : color.blackBright(m.body))}\n`);
  info += color.white("╰╌╌╌╌\n")
  console.log(info);
};
