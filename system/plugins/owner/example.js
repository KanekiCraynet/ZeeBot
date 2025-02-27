module.exports = {
    command: "example",
    alias: ["exp"],
    settings: {
        owner: true,
    },
    description: "Example Features Bot",
    async run(m, {
        sock,
        Func,
        Scraper,
        Uploader,
        store,
        text,
        config
    }) {
        let cap = `*– 乂 Example - Code*
> Pilih type 1 atau 5 Sesuai Dengan kebutuhan anda`;
        if (!text)
            return sock.sendButtonMessage(m.cht, [{
                type: 'list',
                title: "Click Here",
                value: [{
                    headers: "Pilih Example Nya",
                    rows: [{
                            title: `example 1`,
                            command: `${m.prefix + m.command} 1`,
                            body: `Menampilkan Example 1`
                        },
                        {
                            title: `example 2`,
                            command: `${m.prefix + m.command} 2`,
                            body: `Menampilkan Example 2`
                        },
                        {
                            title: `example 3`,
                            command: `${m.prefix + m.command} 3`,
                            body: `Menampilkan Example 3`
                        },
                        {
                            title: `example 4`,
                            command: `${m.prefix + m.command} 4`,
                            body: `Menampilkan Example 4`
                        },
                        {
                            title: `example 5`,
                            command: `${m.prefix + m.command} 5`,
                            body: `Menampilkan Example 5`
                        }
                    ]
                }]
            }], m, {
                body: cap,
                footer: 'pencet button di bawah ini'
            })
        if (Number(text) === 1) {
            let code = `module.exports = {
    command: "",
    alias: [],
    category: [],
    settings: { },
    description: "",
    loading: true,
 async run(m, { sock, client, conn, DekuGanz, Func, Scraper, text, config }) {
    //do Something...
  }
}`;
            m.reply(code);
        } else if (Number(text) === 2) {
            let code = `
class Command {
       constructor() {
       this.command = ""
       this.alias = [] 
       this.category = []
       this.settings = {}
       this.description = ""
       this.loading = true
   }
   run = async(m, { sock, client, conn, DekuGanz, Func, Scraper, text, config }) => {
      //do Something...
  }
}

module.exports = new Command();`;
            m.reply(code);
        } else if (Number(text) === 3) {
            let code = `let deku = async (m, { sock, client, conn, DekuGanz, Func, Scraper, text, config }) => {
   //Do something
}

deku.command = ""
deku.alias = []
deku.category = []
deku.settings = { }
deku.description = ""
deku.loading = true

module.exports = deku`
            m.reply(code);
        } else if (Number(text) === 4) {
            let code = `let rinokumura = {
    command: "",
    alias: [],
    category: [],
    settings: {
        limit: true
    },
    description: "",
    loading: true,
    async run(m, {
        sock,
        client,
        conn,
        DekuGanz,
        Func,
        Scraper,
        text,
        config
    }) {
      //Do something
    }
}

module.exports = rinokumura`
            m.reply(code);
        } else if (Number(text) === 5) {
            let code = `let Yukio = async (m, {
    sock,
    client,
    conn,
    DekuGanz,
    Func,
    Scraper,
    text,
    config
}) => {
    //Do something
}

module.exports = {
    command: "",
    alias: [],
    category: [],
    settings: {},
    description: "",
    loading: true,
    run: Yukio
}`
            m.reply(code);
        } else
            sock.sendButtonMessage(m.cht, [{
                type: 'list',
                title: "Click Here",
                value: [{
                    headers: "Pilih Example Nya",
                    rows: [{
                            title: `example 1`,
                            command: `${m.prefix + m.command} 1`,
                            body: `Menampilkan Example 1`
                        },
                        {
                            title: `example 2`,
                            command: `${m.prefix + m.command} 2`,
                            body: `Menampilkan Example 2`
                        },
                        {
                            title: `example 3`,
                            command: `${m.prefix + m.command} 3`,
                            body: `Menampilkan Example 3`
                        },
                        {
                            title: `example 4`,
                            command: `${m.prefix + m.command} 4`,
                            body: `Menampilkan Example 4`
                        },
                        {
                            title: `example 5`,
                            command: `${m.prefix + m.command} 5`,
                            body: `Menampilkan Example 5`
                        }
                    ]
                }]
            }], m, {
                body: cap,
                footer: 'pencet button di bawah ini'
            })
    },
};
