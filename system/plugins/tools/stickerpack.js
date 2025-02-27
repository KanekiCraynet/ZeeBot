/*
> *[ Plugin Sticker - Pack ]*
> Source Scrape: https://whatsapp.com/channel/0029VaAMjXT4yltWm1NBJV3J
> Cjs
> *[ Script ]*
> https://github.com/AxellNetwork/NekoBot
> https://devuploads.com/bqr62zcbq2oc
> Source
> Ch1
> https://whatsapp.com/channel/0029VadFS3r89inc7Jjus03W
> Ch2
> https://whatsapp.com/channel/0029VateyJuKWEKhJMRKEL20
*/

const { writeExif } = require(process.cwd()+"/lib/sticker");
const axios = require('axios')

class Command {
       constructor() {
       this.command = "sticker-search"
       this.alias = ["ssrch", "src"] 
       this.category = ["tools"]
       this.settings = {
          limit: true
       }
       this.description = "search sticker + detail sticker bot wa"
       this.loading = true
   }
   run = async(m, {
             sock,
             Func,
             text,
             Scraper,
             config,
             store
           }) => {

if (!text) throw ` - < ! > contoh\n\n - ! *[ Search ]*\n> ${m.prefix + m.command} <query>\n\n - ! *[ Detail ]*\n> ${m.prefix + m.command} <link>`
if (/getstickerpack.com/.test(text)) {
const stickerr = await sticker.detail(text)

const pick = await stickerr.sticker[Math.floor(stickerr.sticker.length * Math.random())]
let capt = ` - < ! > *( Search Sticker )*\n`
capt += Object.entries(pick).map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`).join("\n")
capt += `\n> *Sticker Segera Di Kirim Tunggu ya*`

m.reply(capt)

      const buf = await axios.get(pick.image, {
            responseType: 'arraybuffer'
        }).then(a => a.data)

            let stickerte = await writeExif(
          {
            mimetype: "image",
            data: buf,
          },
          {
            packName: config.sticker.packname,
            packPublish: config.sticker.author,
          },
        );

        await m.reply({ sticker: stickerte });
    } else {
    const stickerr = await sticker.search(text)

const pick = stickerr.data[Math.floor(stickerr.data.length * Math.random())]

let capt = ` - < ! > *( Search Sticker )*\n`
capt += Object.entries(pick).map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`).join("\n")
capt += `\n> *Sticker Segera Di Kirim Tunggu ya*`

m.reply(capt)

      const buf = await axios.get(pick.image, {
            responseType: 'arraybuffer'
        }).then(a => a.data)

            let stickerte = await writeExif(
          {
            mimetype: "image",
            data: buf,
          },
          {
            packName: config.sticker.packname,
            packPublish: config.sticker.author,
          },
        );

        await m.reply({ sticker: stickerte });
   }
  }
}

/*
  By NDBotz: https://whatsapp.com/channel/0029VaAMjXT4yltWm1NBJV3J
  Jangan hapus weem woi !!
*/

const BASE_URL = 'https://getstickerpack.com';
const ENDPOINT = 'https://getstickerpack.com/api/v1/stickerdb';
const STORAGE = 'https://s3.getstickerpack.com';

const sticker = {
  search: async(query, page = 1) => {
    try {
      if (!query) {
        throw new Error('Tidak ada query!')
      }
      const res = await axios.post(`${ENDPOINT}/search`, { query, page }).then(result => result.data)
      const data = res.data.map(item => ({
        name: item.title,
        slug: item.slug,
        url: `${BASE_URL}/stickers/${item.slug}`,
        image: `${STORAGE}/${item.cover_image ? item.cover_image : item.tray_icon_large}`,
        download: item.download_counter,
        updated: item.updated_at,
        user: item.user,
      }))
      return { data, total: res.meta.total }
    } catch(e) {
      throw e
    }
  },
  detail: async(slug) => {
    try {
      const match = slug.match(/stickers\/([a-zA-Z0-9-]+)$/);
      const id = match ? match[1] : slug;
      const res1 = await axios.get(`${ENDPOINT}/stickers/${id}`).then(result => result.data.data);
      const res2 = await axios.get(`${ENDPOINT}/stickers/${id}/extras`).then(result => result.data.data);
      const sticker = res1.images.map(item => ({
        index: item.sticker_index,
        image: `${STORAGE}/${item.url}`,
        animated: item.is_animated !== 0 ? true : false,
      }));
      const related = res2.related.map(item => ({
        title: item.title,
        slug: item.slug,
        download: item.download_counter,
        user: item.user,
      }));
      const owner = res2.byOwner.map(item => ({
        title: item.title,
        slug: item.slug,
        image: `${STORAGE}/${item.tray_icon_large}`,
        download: item.download_counter,
        user: item.user,
      }));
      return {
        title: res1.title,
        downloaded: res1.download_counter,
        user: res1.user,
        updated: res1.updated_at,
        sticker,
        keywords: res2.keywords,
        related,
        owner
      };
    } catch(e) {
      throw e
    }
  },
};

module.exports = new Command();