module.exports = {
    command: "stopmenfess",
    alias: [],
    category: ["main"],
    settings: {},
    description: "Menolak Pesan Menfess",
    async run(m, {
        client,
        text
    }) {
        switch (m.command) {
            case "stopmenfess": {
                client.menfes = client.menfes ?? {};
                const find = Object.values(client.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
                if (!find) return m.reply("Belum ada sesi menfess");

                const to = find.a === m.sender ? find.b : find.a;
                await client.sendMessage(to, {
                    text: "_Sesi menfess ini telah dihentikan._",
                    mentions: [m.sender],
                });
                m.reply("Sesi menfess dihentikan.");
                delete client.menfes[find.id];
            }
            break;
        }
    }
}
