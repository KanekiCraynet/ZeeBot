module.exports = {
  command: "toesm",
  alias: [ ],
  category: ["tools"],
  settings: {
    limit: true,
  },
  description: "convert ke esm",
  loading: true,
  async run(m, { text, sock, Scraper, Func }) {
 const args = m.args
 let codeToConvert = text || (m.quoted && m.quoted.text);

    if (!codeToConvert) return m.reply(`Masukkan atau reply kode yang ingin diubah`);

function convertCJSToESM(code) {
    return code
        .replace(/const (\w+) = require\(['"](.+?)['"]\);?/g, 'import $1 from \'$2\';')
        .replace(/let (\w+) = require\(['"](.+?)['"]\);?/g, 'import $1 from \'$2\';')
        .replace(/var (\w+) = require\(['"](.+?)['"]\);?/g, 'import $1 from \'$2\';')
        .replace(/module\.exports\s*=\s*(.*?);?/g, 'export default $1;')
        .replace(/exports\.(\w+)\s*=\s*(.*?);?/g, 'export const $1 = $2;')
        .replace(/require\(['"](.+?)['"]\)/g, 'await import(\'$1\')'); // Menangani dynamic imports
}

function convertESMToCJS(code) {
    return code
        .replace(/import (\w+) from ['"](.+?)['"];/g, 'const $1 = require(\'$2\');')
        .replace(/import \* as (\w+) from ['"](.+?)['"];/g, 'const $1 = require(\'$2\');')
        .replace(/import \{(.*?)\} from ['"](.+?)['"];/g, (match, p1, p2) => {
            const imports = p1.split(',').map(i => i.trim());
            return `const { ${imports.join(', ')} } = require('${p2}');`;
        })
        .replace(/export default (\w+);?/g, 'module.exports = $1;')
        .replace(/export const (\w+) = (\w+);?/g, 'exports.$1 = $2;')
        .replace(/export (.*?) from ['"](.+?)['"];/g, (match, p1, p2) => {
            return `module.exports.${p1} = require('${p2}');`;
        }); // Menangani re-export
}

    let result;
    if (args[0] === '--esm') {
        result = convertCJSToESM(codeToConvert);
    } else if (args[0] === '--cjs') {
        result = convertESMToCJS(codeToConvert);
    } else {
        return m.reply(`Perintah tidak dikenal`);
    }

    m.reply(result);
  },
};