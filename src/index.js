const axios = require('axios');
const cheerio = require('cheerio');

const urlPai = 'https://www.gov.br/pt-br/noticias'

function rasparDados (url){
    axios.get(url).then(resp => {
        const dadoshtml = resp.data;
        const $ = cheerio.load(dadoshtml);
    
        const titulo = $('h1[class="documentFirstHeading"]').text();
        const urlImg = $('#media>img').attr('src');
        const dataPublicada = $('span[class="documentPublished"]>[class="value"]').text();
        const texto = $('[property="rnews:articleBody"]').text();

        const dados = { url, titulo, urlImg, dataPublicada, texto };

        console.log(dados);
    });
};

const urls = axios.get(urlPai).then(resp => {
    const dadosHtml = resp.data;
    const $ = cheerio.load(dadosHtml);
    const dados = [];
    $('a[class="summary url"]').each((i,e) => {
        const link = $(e).attr('href');
        dados.push(link);
    });
    return (dados);
})

async function main () {
    const mainUrls = await urls;
    mainUrls.map((i,e) => {
        rasparDados(i)
    })
};

main()