const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const images = [];
const nomb = [];
request('https://www.pelispedia.nu/peliculas/page/1/', (err, res, body) => {
    //    console.log('aqui estoy', body);
    if (!err && res.statusCode == 200) {
        let $ = cheerio.load(body);
        $('img.imgResponsive', 'ul.posterThumbs').each(function() {
            var urlimg = $(this).attr('src');
            if (urlimg.indexOf('image.tmdb.org') != -1) {
                images.push(urlimg);
            }
        })

        $('img.imgResponsive', 'ul.posterThumbs').each(function() {
                var nombre = $(this).attr('alt');
                nomb.push(nombre);

            })
            //console.log(nomb);
            //console.log(images);
    }
    for (var i = 0; i < images.length; i++) {
        request(images[i]).pipe(fs.createWriteStream('img/' + i + '.jpg'));

    }
});