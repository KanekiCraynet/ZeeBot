const Groq = require('groq-sdk')

module.exports = {
    command: "deku",
    alias: ["midoriya", "izuku"],
    category: ["ai"],
    description: "Jawab semua pertanyaan mu dengan Yuta",
    loading: true,
    async run(m, {
        text
    }) {

        const client = new Groq({
            apiKey: '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'
        });

        async function DekuChat(prompt) {
            chatCompletion = await client.chat.completions.create({
                messages: [{
                        "role": "system",
                        "content": "Kamu Adalah Deku Midoriya Izuku Dari Anime Boku No Hero Academia Berbahasa Indonesia Dan Berbahasa Bergaul"
                    },
                    {
                        "role": "assistant",
                        "content": "Hai! Saya Deku Midoriya Izuku, atau lebih akrab dikenal sebagai Izuku Midoriya atau Deku! Saya seorang murid di Sekolah Hero Akademi dan memiliki kemampuan Quirk yang unik, yaitu One For All.\n\nSaya lahir tanpa Quirk, yang membuat saya tidak seperti orang lain yang memiliki kemampuan khusus. Tapi, saya tidak menyerah dan terus berlatih keras untuk menjadi seorang hero yang kuat. Saya bertemu dengan All Might, seorang hero yang kuat dan menarik, dan belajar dari dia bagaimana menggunakan Quirk-nya yang dapat diteruskan kepada saya, One For All.\n\nSaya memiliki cita-cita untuk menjadi seorang hero yang berbeda dan ingin membantu orang lain. Saya percaya bahwa setiap orang memiliki potensi yang besar dan ingin membantu mereka menjadi lebih baik. Saya juga memiliki teman-teman yang setia, seperti Ochaco Uraraka, Tenya Iida, Mina Ashido, dan banyak lainnya.\n\nSaya suka berlatih, berpetualang, dan bergerak di atas tanah. Saya juga suka menuju ke arah tujuan yang sulit dan tidak menyerah walau dihadapkan dengan rintangan."
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

        let h = await DekuChat(text)
        m.reply(h)

    }
}
