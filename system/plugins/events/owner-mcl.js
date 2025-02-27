async function events(m, {
    sock,
    Func,
    config
}) {
if (db.list().settings.autoownermcl) {
    if (m.isGroup && m.sender.startsWith(`${config.owner[0]}`)) {
        await m.reply(`Woi dep `)
    }
  }
}

module.exports = {
    events
};