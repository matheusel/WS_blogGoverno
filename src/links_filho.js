const axios = require('axios');
const cheerio = require('cheerio');

const urlFilho = 'https://www.gov.br/pt-br/noticias/meio-ambiente-e-clima/2023/01/marina-silva-anuncia-a-criacao-da-autoridade-nacional-de-seguranca-climatica';

axios.get(urlFilho).then(resp => {
    const dadoshtml = resp.data;
    const $ = cheerio.load(dadoshtml);

    const titulo = $('h1[class="documentFirstHeading"]').text();
    const urlImg = $('#media>img').attr('src');
    const dataPublicada = $('span[class="documentPublished"]>[class="value"]').text();
    const texto = $('[property="rnews:articleBody"]').text();

    const dados = { titulo, urlImg, dataPublicada, texto }
    
    console.log(dados);
})