const fs = require('fs');
const rp = require('request-promise');
const $ = require('cheerio');

const URL = 'https://techiedelight.quora.com/500-Data-Structures-and-Algorithms-interview-questions-and-their-solutions?srid=dV6r';
const FILENAME = 'urls.txt'

rp(URL)
    .then(html => {
        const parsed = $('span > a', html);
        const URLs = [];
        Object.keys(parsed)
            .forEach(key => {
                const item = parsed[key]
                if(!item['attribs'] || item['attribs']['class'] !== 'external_link') return
                URLs.push(item['attribs']['href'])
            });
        const stream = fs.createWriteStream(FILENAME)
        stream.once('open', fd => {
            URLs.forEach(url => stream.write(`${url}\n`));
            stream.end();
        });
    })
    .catch(err => {
        console.log(err);
    });
