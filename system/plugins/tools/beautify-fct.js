const ya = require("js-beautify")

class Command {
    constructor() {
        this.command = "beautify-fct"
        this.alias = ["bft"]
        this.category = ["tools"]
        this.settings = {
            limit: true
        }
        this.description = "Mempercantikan Skrep Dan Fungsi"
        this.loading = true
    }
    run = async (m, {
        sock,
        Func,
        Scraper,
        config,
        store
    }) => {

        if (!m.quoted) throw 'reply pesan skrep atau fungsi buat di beautify'

        const hasil = await ya(m.quoted.body)

        m.reply(hasil)
    }
}

module.exports = new Command();