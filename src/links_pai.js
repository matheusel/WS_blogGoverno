const axios = require('axios');
const cheerio = require('cheerio');

const urlPai = 'https://www.gov.br/pt-br/noticias'

axios.get(urlPai).then(resp => {
    const dadosHtml = resp.data;
    const $ = cheerio.load(dadosHtml);
    const dados = []
    $('a[class="summary url"]').each((i,e) => {
        const link = $(e).attr('href')
        const dado = { link }
        dados.push(dado)
    });
    console.log(dados);
})