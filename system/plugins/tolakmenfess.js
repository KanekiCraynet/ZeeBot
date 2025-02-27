module.exports = {
    command: "tolakmenfess",
    alias: [],
    category: ["main"],
    settings: {},
    description: "Menolak Pesan Menfess",
    async run(m, {
        client,
        text
    }) {
        switch (m.command) {
            case "tolakmenfess": {
                client.menfes = client.menfes ?? {};
                const roof = Object.values(client.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
                if (!roof) return m.reply("Belum ada sesi menfess");

                const other = [roof.a, roof.b].find(user => user !== m.sender);
                await client.sendMessage(other, {
                    text: `_Maaf, @${m.sender.split("@")[0]} menolak menfess kamu._`,
                    mentions: [m.sender],
                });
                m.reply("Menfess berhasil ditolak.");
                delete client.menfes[roof.id];
            }
            break;
        }
    }
}
