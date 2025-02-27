let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {
    await sock.groupLeave(m.cht).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))

}

deku.command = "leave"
deku.alias = []
deku.category = ["owner"]
deku.settings = {
    owner: true
}
deku.description = "Keluar Bot Dari Group"
deku.loading = true

module.exports = deku