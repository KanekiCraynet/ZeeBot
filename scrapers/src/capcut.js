/*
⚡ Capcut Template Video Downloader
📦 By NDBZ
🔗 Link: https://whatsapp.com/channel/0029VaAMjXT4yltWm1NBJV3J
*/
const axios = require('axios')

function download(url) {
  return new Promise(async(resolve, reject) => {
    try {
      let cc = await axios.get(url, {
        headers: {
          'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
        }
      }).then(x => x.data)
      
      let dataMatch = /<script nonce="argus-csp-token">window\._ROUTER_DATA = (.*?)<\/script>/;
      if (cc.match(dataMatch)) {
        let getJson = JSON.parse(cc.match(dataMatch)[1]).loaderData['template-detail_$'].templateDetail
        if (getJson.templateId) {
          resolve({ status: true, mess: `Berhasil mengambil data`, data: getJson })
        } else {
          resolve({ status: false, mess: `Tidak ada metadata tersedia`})
        }
      }
    } catch(e) {
      reject({ status: false, mess: `Gagal mengambil metadata`})
    }
  })
}

module.exports = download