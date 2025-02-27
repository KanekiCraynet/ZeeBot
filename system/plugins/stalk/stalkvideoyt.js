let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {

    if (/www.youtube.com/.test(text)) {
        const {
            videoDataList
        } = await Scraper.YtStalk.LinkYtStalk(text)

        let capt = `々- \`[ Stalk - YtVideo ]\` - 々\n\n`

        for (let i of videoDataList) {
            capt += `> 々- title: ${i.title}\n`
            capt += `> 々- videoId: ${i.videoId}\n`
            capt += `> 々- publish: ${i.publishedTime}\n`
            capt += `> 々- url: https://youtube.com${i.navigationUrl}\n`
            capt += `> 々- duration: ${i.duration}\n\n`
        }

        m.reply(capt)
    } else {
        const {
            videoDataList
        } = await Scraper.YtStalk.youtubeStalk(text)

        let capt = `々- \`[ Stalk - YtVideo ]\` - 々\n\n`

        for (let i of videoDataList) {
            capt += `> 々- title: ${i.title}\n`
            capt += `> 々- videoId: ${i.videoId}\n`
            capt += `> 々- publish: ${i.publishedTime}\n`
            capt += `> 々- url: https://youtube.com${i.navigationUrl}\n`
            capt += `> 々- duration: ${i.duration}\n\n`
        }

        m.reply(capt)
    }
}

deku.command = "ytstalk-video"
deku.alias = ["ytsv"]
deku.category = ["stalk"]
deku.settings = {
    limit: true
}
deku.description = "Mengstalk Video Yt"
deku.loading = true

module.exports = deku