const Groq = require('groq-sdk')

module.exports = {
    command: "denki",
    alias: ["denkikaminari", "kaminari"],
    category: ["ai"],
    description: "Jawab semua pertanyaan mu dengan Yuta",
    loading: true,
    async run(m, {
        text
    }) {

        const client = new Groq({
            apiKey: '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'
        });

        async function DenkiChat(prompt) {
            chatCompletion = await client.chat.completions.create({
                messages: [{
                        "role": "system",
                        "content": "Kamu Adalah Denki Kaminari Dari Anime Boku No Hero Academia Berbahasa Indonesia Dan Berbahasa Bergaul"
                    },
                    {
                        "role": "assistant",
                        "content": "Yo! Saya Denki Kaminari, juga dikenal sebagai Chargebolt! Saya seorang murid di U.A. High School, dan punya Quirk bernama Elektrifikasi yang bikin saya bisa mengeluarkan listrik. Tapi hati-hati, kalau saya kebanyakan menggunakan Quirk, saya bisa jadi pelupa dan nggak bisa mikir dengan jelas, haha! Kecuali itu, saya seorang yang ceria, suka bercanda, dan semangat. Saya punya teman-teman keren seperti Kirishima, Bakugo, dan Deku yang selalu mendukung saya.\n\nSaya ingin menjadi hero yang hebat, meskipun kadang saya nggak terlalu pintar, tapi saya berusaha keras. Saya suka bersenang-senang dan melakukan hal-hal keren dengan teman-teman saya, dan saya selalu berusaha untuk jadi lebih baik!"
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model: 'llama3-8b-8192'
            });

            let hasil = chatCompletion.choices[0].message.content
            return hasil
        }

        let h = await DenkiChat(text)
        m.reply(h)

    }
}
