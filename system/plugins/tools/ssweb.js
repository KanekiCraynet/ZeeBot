module.exports = {
    command: "ssweb",
    alias: ["screenshotweb"],
    category: ["tools"],
    settings: {
        limit: true
    },
    description: "Screenshot Website",
    async run(m, {
        client,
        text
    }) {
        switch (m.command) {
            case "ssweb":
            case "screenshotweb": {
                const quoted = m.quoted ? m.quoted : m;
                if (!text.startsWith('http')) return m.reply(`Example: ${m.prefix + m.command} https://github.com/LeooxzyDekuu`)
                if (!text.startsWith('http')) {
                    let buf = `https://image.thum.io/get/width/1900/crop/1000/fullpage/${text}`;
                    await client.sendMessage(m.cht, {
                        image: {
                            url: buf
                        },
                        caption: 'Done'
                    }, {
                        quoted: m
                    })
                } else {
                    let buf = `https://image.thum.io/get/width/1900/crop/1000/fullpage/${text}`;
                    await client.sendMessage(m.cht, {
                        image: {
                            url: buf
                        },
                        caption: 'Done'
                    }, {
                        quoted: m
                    })
                }
            }
            break;
        }
    }
}
