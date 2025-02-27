const axios = require('axios');

class y2ts {
    dl = async function(url) {
        try {
            const {
                data
            } = await axios.get(`https://y2ts.us.kg/youtube?url=${url}`, {
                headers: {
                    'Authorization-Token': await this.token(),
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                    'Content-Type': 'application/json'
                }
            })
            if (data.result) {
                const result = data.result
            } else {
                console.log(`[ ! ] ${data.text} : ${data.progress}/1000`);
            };
            const result = data.result
            return {
                result
            };
        } catch (e) {
            return {
                message: e
            }
            console.log('message: ' + e)
        }
    }
    token = async function() {
        return axios.get('https://y2ts.us.kg/token').then(a => a.data.token)
    }
}

module.exports = new y2ts()