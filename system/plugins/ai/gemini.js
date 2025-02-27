const Gemini = require('btch-gemini');

module.exports = {
  command: "gemini",
  alias: ["aigemini"],
  category: ["ai"],
  description: "Jawab semua pertanyaan mu dengan gemini",
  loading: true,
  async run(m, { text, sock, Scraper }) {

if(!text) throw 'masukan pertanyaan nya'

const { content } = await Gemini.gemini_chat(text)

m.reply(content)

}
}