const fs = require('fs');
const aws = require('aws-sdk');
const rp = require('request-promise');
const $ = require('cheerio');

const S3_BUCKET = process.env.S3_BUCKET
const S3_PREFIX = process.env.S3_PREFIX

aws_config = {
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: process.env.S3_BUCKET_REGION
}

aws.config.update(aws_config);

const s3 = new aws.S3();

const URL = 'https://techiedelight.quora.com/500-Data-Structures-and-Algorithms-interview-questions-and-their-solutions?srid=dV6r';

rp(URL)
    .then(html => {
        // get and parse DOM response
        const parsed = $('span > a', html);
        const URLs = [];
        Object.keys(parsed)
            .forEach(key => {
                const item = parsed[key]
                if(!item['attribs'] || item['attribs']['class'] !== 'external_link') return
                URLs.push(item['attribs']['href'])
            });
        // write urls to textfile
        const tmpFilename = '/tmp/urls.txt';
        const stream = fs.createWriteStream(tmpFilename);
        stream.once('open', fd => {
            URLs.forEach(url => stream.write(`${url}\n`));
            stream.end();
        })
        // upload text file
        stream.on('close', () => {
            
            fs.readFile(tmpFilename, (err, data) => {
                if(err) throw err;
                const params = {
                    Bucket: S3_BUCKET,
                    Key: `${S3_PREFIX}/urls.txt`,
                    Body: data
                }
                s3.upload(params, (s3err, data) => {
                    if(s3err) throw s3err;
                    console.log(`File uploaded successfully to ${data.Location}`)
                });
            });
        })
    })
    .catch(err => {
        console.log(err);
    });
