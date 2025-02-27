class Command {
    constructor() {
        this.command = "clearchat"
        this.alias = []
        this.category = ["owner"]
        this.settings = {
            owner: true
        }
        this.description = "Membersihkan pesan dari chat Group"
        this.loading = true
    }
    run = async (m, {
        sock,
        Func,
        Scraper,
        config,
        store
    }) => {
        let msg = Object.keys(store.groupMetadata)

        for (let id of msg) {
            sock.clearMessage(id, m.key, m.timestamps)
        }
        m.reply(`> Berhasil Membersihkan ${msg.length} chat group`);
    }
}

module.exports = new Command();