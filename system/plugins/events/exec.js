const util = require("util");
const config = require(process.cwd() + "/settings.js");
const {
    exec
} = require("child_process");
const fs = require("node:fs");
const axios = require("axios");
const Func = require(process.cwd() + "/lib/function");

async function events(m, {
    sock,
    client,
    conn,
    DekuGanz,
    config,
    store
}) {
    const quoted = q = m.isQuoted ? m.quoted : m;
    const Scraper = await scraper.list();
    await db.main(m);
    // Eval command untuk owner
    if (
        [">", "eval", "=>"].some((a) =>
            m.command.toLowerCase().startsWith(a),
        ) &&
        m.isOwner
    ) {
        let evalCmd = "";
        try {
            evalCmd = /await/i.test(m.text) ?
                eval("(async() => { " + m.text + " })()") :
                eval(m.text);
        } catch (e) {
            evalCmd = e;
        }
        new Promise((resolve, reject) => {
                try {
                    resolve(evalCmd);
                } catch (err) {
                    reject(err);
                }
            })
            ?.then((res) => m.reply(util.format(res)))
            ?.catch((err) => m.reply(util.format(err)));
    }
    // Exec command untuk owner
    if (["exec", "$"].includes(m.command.toLowerCase()) && m.isOwner) {
        try {
            exec(m.text, (err, stdout) => {
                if (err) return m.reply(util.format(err));
                m.reply(util.format(stdout));
            });
        } catch (error) {
            m.reply(util.format(error));
        }
    }
}

module.exports = {
    events
}
