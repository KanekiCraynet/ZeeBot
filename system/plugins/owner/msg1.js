const fs = require('fs')
const baileys = require('baileys')
const {
    generateWAMessageContent
} = baileys

let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {

    let sections = [{
            title: '<!> Informasi Bot',
            rows: [{
                    title: 'Script🗒️',
                    description: `Menampilkan pesan Script`,
                    id: `${m.prefix}sc`
                },
                {
                    title: 'tqto👤',
                    description: `Menampilkan pesan thank you to`,
                    id: `${m.prefix}ping`
                },
                {
                    title: 'Creator 👑',
                    description: `Menampilkan pesan thank you to`,
                    id: `${m.prefix}owner`
                },
            ]
        },
        {
            title: '< ! > Ai',
            rows: [{
                    title: 'Ai Yuta',
                    description: `Ai Yuta Dari Anime: Jujutsu kaisen`,
                    id: `${m.prefix}Yuta halo`
                },
                {
                    title: 'Ai Bakugo',
                    description: `Ai Bakugo Dari: Anime My Hero Academia`,
                    id: `${m.prefix}bakugo halo`
                },
                {
                    title: 'Ai Deku',
                    description: `Ai Deku Dari: Anime My Hero Academia`,
                    id: `${m.prefix}deku halo`
                },
                {
                    title: 'Ai Denki',
                    description: `Ai Denki Dari: Anime My Hero Academia`,
                    id: `${m.prefix}denki halo`
                },
                {
                    title: 'Ai Todoroki',
                    description: `Ai Todoroki Dari: Anime My Hero Academia`,
                    id: `${m.prefix}todoroki halo`
                },
            ]
        }
    ]

    let listMessage = {
        title: 'Click Here⎙',
        sections
    };

    async function anu(url) {
        const {
            imageMessage
        } = await generateWAMessageContent({
            image: url
        }, {
            upload: sock.waUploadToServer
        })
        return imageMessage
    }
    sock.sendMessage(m.cht, {
        text: "What do you think about these baileys?",
        footer: config.ownername,
        title: "Hai Bg",
        subtitle: "",
        interactiveButtons: [{
                name: 'single_select',
                buttonParamsJson: JSON.stringify(listMessage)
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: `Cek Logs`,
                    id: `${m.prefix}ceklogs`
                })
            }
        ],
        header: {
            hasMediaAttachment: true,
            product: {
                product: {
                    productImage: await anu(fs.readFileSync('./image/Dekusad.jpg')),
                    productId: "9313349308709024",
                    title: "Hi Everyone",
                    description: "I Love Kasumi",
                    currencyCode: "IDR",
                    priceAmount1000: "30000000",
                    retailerId: "Kasumi",
                    url: global.linkch,
                    productImageCount: 1,
                },
                businessOwnerJid: `${config.owner[0]}@s.whatsapp.net`,
            }
        }
    })
}

deku.command = "msg1"
deku.alias = []
deku.category = ["owner"]
deku.settings = {
    owner: true
}
deku.description = ""
deku.loading = true

module.exports = deku