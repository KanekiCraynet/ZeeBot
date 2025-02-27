let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {

    if (!text) throw 'masukan gamertag anda'

    const xbx = await Scraper.xbox(text)

    if (xbx === 0) {
        m.reply('user tidak di temukan')
    }

    let capt = ` -〆 *[ Stalk - Xbox ]*\n\n`
    capt += `\`[ metadata ]\`\n`
    capt += `> Name: ${xbx.metadata.name}\n`
    capt += `> game_score: ${xbx.metadata.game_score}\n\n`
    capt += `\`[ Game ]\`\n`
    capt += xbx.history.map((a) =>
            Object.entries(a)
            .map(([b, c]) => `> ${b.capitalize()}: ${c}`)
            .join("\n"),
        )
        .join("\n\n");

    sock.sendMessage(m.cht, {
        image: {
            url: xbx.metadata.icon
        },
        caption: Func.Styles(capt)
    }, {
        quoted: m
    })
}

deku.command = "xbox"
deku.alias = ["stalkxbx", "xbx", "stalkxbox"]
deku.category = ["stalk"]
deku.settings = {
    limit: true
}
deku.description = "Mengstalk/Akun Xbox"
deku.loading = true

module.exports = deku