const {
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateWAMessage,
    proto,
    getDevice
} = require('baileys')
const crypto = require('crypto')

let events = async (m, {
    sock
}) => {
    sock.sendAlbumMessage = async (jid, medias, options = {}) => {
        if (typeof jid !== 'string') throw new TypeError(`jid must be string, received: ${jid} (${jid?.constructor?.name})`)
        for (const media of medias) {
            if (!media.type || (media.type !== 'image' && media.type !== 'video')) throw new TypeError(`medias[i].type must be 'image' or 'video', received: ${media.type} (${media.type?.constructor?.name})`)
            if (!media.data || (!media.data.url && !Buffer.isBuffer(media.data))) throw new TypeError(`medias[i].data must be object with url or buffer, received: ${media.data} (${media.data?.constructor?.name})`)
        }
        if (medias.length < 2) throw new RangeError('Minimum 2 media')

        const caption = options.text || options.caption || ''
        const delay = !isNaN(options.delay) ? options.delay : 500

        delete options.text
        delete options.caption
        delete options.delay

        const album = generateWAMessageFromContent(jid, {
            messageContextInfo: {
                messageSecret: new Uint8Array(crypto.randomBytes(32))
            },
            albumMessage: {
                expectedImageCount: medias.filter(media => media.type === 'image').length,
                expectedVideoCount: medias.filter(media => media.type === 'video').length,
                ...(options.quoted && options.quoted.message ? {
                    contextInfo: {
                        remoteJid: options.quoted.key.remoteJid,
                        fromMe: options.quoted.key.fromMe,
                        stanzaId: options.quoted.key.id,
                        participant: options.quoted.key.participant || options.quoted.key.remoteJid,
                        quotedMessage: options.quoted.message || ''
                    }
                } : {})
            }
        }, {})

        await sock.relayMessage(album.key.remoteJid, album.message, {
            messageId: album.key.id
        })

        for (const i in medias) {
            const {
                type,
                data
            } = medias[i]
            const img = await generateWAMessage(album.key.remoteJid, {
                [type]: data,
                ...(i === '0' ? {
                    caption
                } : {})
            }, {
                upload: sock.waUploadToServer
            }).catch(err => {
                console.log('Error saat generateWAMessage:', err)
                return null
            })

            if (!img || !img.message) {
                console.log('Gagal membuat pesan gambar/video, lewati ke media berikutnya')
                continue
            }

            img.message.messageContextInfo = {
                messageSecret: new Uint8Array(crypto.randomBytes(32)),
                messageAssociation: {
                    associationType: 1,
                    parentMessageKey: album.key
                }
            }

            await sock.relayMessage(img.key.remoteJid, img.message, {
                messageId: img.key.id
            })

            await sock.delay(delay)
        }

        return album
    }
};

module.exports = { events }
