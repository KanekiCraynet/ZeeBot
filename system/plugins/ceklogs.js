let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {
    let logs = ` - 々 \`[ Cek Logs - Cek Update ]\` 々-

 - 々 \`[ Fixed ]\`
> - 々 SpotifyDl
> - 々 Xbox
> - 々 Profile
> - 々 Ytdl
> - 々 Tiktok
> - 々 qc

 - 々 \`[ Update ]\`
> - 々 Yt search
> - 々 Play
> - 々 Tes
> - 々 Auto shalat
> - 々 Brat ada --animated
> - 々 menu button

 - 々 \`[ Added Fitur ]\`
> - 々 Emotecraft
> - 々 aio
> - 々 bft
> - 々 snackvideo
 `

    m.reply(Func.Styles(logs))
}

deku.command = "ceklogs"
deku.alias = ["cl"]
deku.category = ["main"]
deku.settings = {}
deku.description = "Cek Logs Bot Wa"
deku.loading = true

module.exports = deku