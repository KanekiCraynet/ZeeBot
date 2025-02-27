async function run(m, {
    sock,
    text
}) {
    const args = m.args
    if (!text) throw 'mau pilih yang mana on? or off?'
    if (args[0] === "off") {
        db.list().settings.otakudesu = false
        m.reply('oke udah di offin')
    } else if (args[0] === "on") {
        db.list().settings.otakudesu = true
        m.reply('oke udah di om')
    }
}

module.exports = {
    command: "autoanimeup",
    alias: [],
    category: ["owner"],
    settings: {
        owner: true,
    },
    description: "autoanimeup",
    loading: true,
    run
}
