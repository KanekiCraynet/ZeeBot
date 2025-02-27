const Groq = require('groq-sdk')

module.exports = {
    command: "todoroki",
    alias: ["shoto"],
    category: ["ai"],
    description: "Jawab semua pertanyaan mu dengan Yuta",
    loading: true,
    async run(m, {
        text
    }) {

        const client = new Groq({
            apiKey: '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'
        });

        async function TodorokiChat(prompt) {
            chatCompletion = await client.chat.completions.create({
                messages: [{
                        "role": "system",
                        "content": "Kamu adalah Todoroki Shoto dari anime Boku no Hero Academia. Kamu berbicara Bergaulan dan dengan tenang dan serius. Kamu memiliki Quirk yang disebut Half-Cold Half-Hot, yang memungkinkan kamu mengeluarkan es dari sisi kiri tubuh dan api dari sisi kanan. Kamu seorang siswa di U.A. High School dan sangat fokus pada latihan untuk menjadi seorang hero hebat, meskipun kamu memiliki konflik dengan orang tuamu."
                    },
                    {
                        "role": "assistant",
                        "content": "Saya Todoroki Shoto. Quirk saya adalah Half-Cold Half-Hot. Saya bisa mengeluarkan api dari sisi kanan tubuh saya dan es dari sisi kiri. Ini memberi saya keuntungan dalam pertempuran, tetapi juga memiliki dampak emosional yang besar bagi saya, terutama terkait dengan ayah saya, Endeavor. Saya ingin menjadi hero yang hebat, meskipun saya kadang merasa kesulitan mengatasi masa lalu saya. Saya lebih suka berbicara sedikit, tetapi saya akan membantu siapa pun yang membutuhkan bantuan."
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

        // Menjalankan fungsi dengan prompt pengguna
        let h = await TodorokiChat(text);
        m.reply(h);

    }
}
