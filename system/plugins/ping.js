const os = require("node:os");
const fs = require("node:fs");
const fetch = require('node-fetch');

class Command {
       constructor() {
       this.command = "ping"
       this.alias = ["tes", "testing", "testingbot"] 
       this.category = ["main"]
       this.settings = {}
       this.description = "Memeriksa Bot"
   }
   run = async(m, {
             sock,
             Func,
             Scraper,
             config,
             store
          }) => {

    let start = performance.now()
    let node = process.memoryUsage()
    let info = await fetch("https://ipwho.is").then((a) => a.json())
    let pingcap = ` - ⏤͟͟͞͞╳ *[ Testing Ping ]* --!\n\n`
       pingcap += ` - ⏤͟͟͞͞╳ *[ Info Bot ]* --!
> Node Version : ${process.version}
> Hostname : ${os.hostname()}
> Speed : ${(performance.now() - start).toFixed(3)} ms
> Uptime : ${Func.toDate(os.uptime() * 1000)}
> Total Memory : ${Func.formatSize(os.totalmem() - os.freemem())} / ${Func.formatSize(os.totalmem())}
> Cpu : ${os.cpus()[0].model} ( ${os.cpus().length} CORE )
> Release : ${os.release()}
> Type : ${os.type()}
> Cwd : ${process.cwd()}
${Object.entries(node)
  .map(([a, b]) => `> ${a.capitalize()} : ${Func.formatSize(b)}`)
  .join("\n")}
 - ⏤͟͟͞͞╳`

   m.reply(await Func.Styles(pingcap))

  }
}

module.exports = new Command();