module.exports = {
    command: "balasmenfess",
    alias: [],
    category: ["main"],
    settings: {},
    description: "Membalas Pesan Menfess",
    async run(m, {
        client,
        text
    }) {
        switch (m.command) {
            case "balasmenfess": {
                client.menfes = client.menfes ?? {};
                const roof = Object.values(client.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
                if (!roof) return m.reply("Belum ada sesi menfess");

                const room = Object.values(client.menfes).find(room => [room.a, room.b].includes(m.sender) && room.state === 'WAITING');
                if (!room) return m.reply("Tidak ada sesi menfess yang sedang menunggu");

                const other = [room.a, room.b].find(user => user !== m.sender);
                room.b = m.sender;
                room.state = 'CHATTING';
                client.menfes[room.id] = {
                    ...room
                };

                await client.sendMessage(other, {
                    text: `_@${m.sender.split("@")[0]} telah menerima menfess kamu, sekarang kamu bisa chat lewat bot ini._\n\n*NOTE:* Ketik .stopmenfess untuk berhenti.`,
                    mentions: [m.sender],
                });
                m.reply("Menfess diterima, sekarang kamu bisa chat!");
                m.reply("Silakan balas pesan langsung di chat ini. Semua pesan akan diteruskan.");
            }
            break;
        }
    }
}
