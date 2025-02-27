module.exports = {
  command: "r",
  alias: ["shutdown"],
  category: ["owner"],
  settings: {
    owner: true,
  },
  description: "Untuk Restart Bot",
  async run(m, { sock, Func, text, config }) {
             m.reply(`Restarting will be completed in seconds`)
          await sleep(3000)
        process.exit()
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}