const axios = require('axios')

module.exports = {
    command: "deepseek",
    alias: ["ds", "dsai", "deepseekai"],
    category: ["ai"],
    settings: {
        limit: true
    },
    description: "Menanyakan Ai Deepseek",
    loading: true,
    async run(m, {
        client,
        text
    }) {

        /*
        🤖 *Blackbox DeepSeek (Case)*
        👤 by Rynn
        > *Info*: -
        > *Code*: 
        */

        //Version plugin

        switch (m.command) {
            case "deepseek":
            case "ds":
            case "dsai":
            case "deepseekai": {

                try {
                    if (!text) return m.reply('> Mana textnya?')
                    const hytam = await deepseek(text)
                    m.reply(hytam)
                } catch (err) {
                    console.error(err)
                    m.reply('> Terjadi kesalahan!')
                }
            }
            break
        }
    }
}

async function deepseek(query) {
    let {
        data
    } = await axios.post("https://api.blackbox.ai/api/chat", {
        messages: [{
            id: null,
            role: "user",
            content: query
        }],
        userSelectedModel: "deepseek-v3"
    })
    return data
}
