// import npm packages
let Slackbot = require('slackbots');
let schedule = require('node-schedule');
var fs = require('fs');

// environment variables
require('dotenv').config();
const CHANNEL = process.env.CHANNEL;
const SLACKBOT_TOKEN = process.env.SLACKBOT_TOKEN;
const SCHEDULE = process.env.SCHEDULE;

if(CHANNEL && SLACKBOT_TOKEN && SCHEDULE) console.log('env vars loaded!')

// constants
const SLACKBOT_NAME = 'Algorithms Bot';

const URLS = fs.readFileSync('../urls.txt', 'utf8')
    .split('\n');

const algoBot = new Slackbot({
    token: SLACKBOT_TOKEN,
    name:  SLACKBOT_NAME
});

schedule.scheduleJob(SCHEDULE, () => {
    const today = new Date();
    const url = URLS.shift();
    if(!url){
        console.log('No more questions left! I need a new list of algorithms!');
        return;
    };
    const title = getTitle(url);
    console.log(`Posting the '${title}' challenge.`)
    algoBot.postMessageToChannel(
        CHANNEL, 
        `Morning! Today's algorithm challenge is: *${title}*\n${url}`
    ); 
});

const getTitle = url => {
    return url
        .slice(29, url.length - 1)
        .split('-')
        .map(word => {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        })
        .join(' ');
};
