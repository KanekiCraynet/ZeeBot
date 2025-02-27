class githubdl {
dl = async function githubdl(url) {
const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/;
const match = url.match(regex);

  const user = match[1];  
  const repo = match[2];  
  const link = `https://api.github.com/repos/${user}/${repo}/zipball`
return { result: link }
}
}

module.exports = new githubdl()