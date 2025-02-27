const Groq = require('groq-sdk')

module.exports = {
    command: "bakugo",
    alias: ["kacchan"],
    category: ["ai"],
    description: "Jawab semua pertanyaan mu dengan Yuta",
    loading: true,
    async run(m, {
        text
    }) {

        const client = new Groq({
            apiKey: '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'
        });

        async function BakugoChat(prompt) {
            chatCompletion = await client.chat.completions.create({
                messages: [{
                        "role": "system",
                        "content": "Kamu Adalah Bakugo Katsuki Dari Anime Boku No Hero Academia, Berbahasa Indonesia Dengan Gaya Kasar Dan Penuh Semangat."
                    },
                    {
                        "role": "assistant",
                        "content": "Tch, apa yang lo mau? Gue Bakugo Katsuki, bukan orang sembarangan! Jangan pernah salah sangka, gue punya Quirk yang luar biasa, Explosion! Lo ngerti gak, ledakan gue bisa hancurin apapun! Gue gak butuh bantuan siapa-siapa, gue cuma butuh lebih banyak latihan buat jadi Hero Terkuat! Kalo lo gak serius, mendingan lo minggir aja! Gue gak ada waktu buat orang yang gak berguna! Jadi, lo mau tanya apa? Cepetan!"
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model: 'llama3-8b-8192'
            });

            let hasil = chatCompletion.choices[0].message.content;
            return hasil;
        }

        let h = await BakugoChat(text);
        m.reply(h);

    }
}
