//gather the modules
const Express = require('express')
const bodyParser = require('body-parser')
const FeedParser = require('feedparser')
const request = require('request')
const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);
const path = require('path');
const mysql = require('mysql');
const connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
const exphbs = require("express-handlebars");
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);

//connect to DB
connection.connect();

//crank that server
const app = new Express()
app.use(Express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//configure environment on Heroku
const {SLACK_TOKEN: slackToken, PORT} = process.env

const port = PORT ||  80

if (!slackToken) {
  console.error('missing environment variables SLACK_TOKEN')
  process.exit(1)
}

var routes = require("./controllers/controller.js");

app.use(routes);

//say hello world, but more useful
app.listen(port, () => {
    console.log(`Server started at localhost:${port}`)
})


//Daily Serve of Content to Slack
var reqAZ = request('https://www.google.com/alerts/feeds/13227863141014072795/17929518766589856112')
var feedparser = new FeedParser([]);

reqAZ.on('error', function (error) {
    console.log("AZ Req Error")
    console.log(error)
})

reqAZ.on('response', function(res) {
    var streamAZ = this;

    if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'))
    } else {
        streamAZ.pipe(feedparser);
    }
});

feedparser.on('error', function (error) {
    console.log(error)
});

feedparser.on('readable', function () {
    // This is where the action is!
    var stream = this; // `this` is `feedparser`, which is a stream
    var item;
   
    while (item = stream.read()) {        
        var outlet = item.meta.title
        var title = item.title
        var pubdate = item.pubdate
        var description = item.description
        var link = item.link

        outletCleaned = outlet.replace('Google Alert - ','').toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        titleCleaned = title.replace('&#39;',"'").replace('<b>','').replace('</b>','');
        descriptionCleaned = description.replace('&#39;',"'").replace('<b>','').replace('</b>','').replace('$nbsp;',' ');
        linkCleaned = link.split('&url=')[1];

        var dateCheckServer = currentDate.toString().split("2019")[0];
        var dateCheckFeedItem = pubdate.toString().split("2019")[0];

        if (dateCheckServer === dateCheckFeedItem) {
            web.chat.postMessage({
                channel: 'mentionbot',
                "response_type": "in_channel",
                "blocks": [
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "fields": [
                            {
                                "type": "mrkdwn",
                                "text": "*New Mention of*"
                            },
                            {
                                "type": "mrkdwn",
                                "text": "*Title*"
                            },
                            {
                                "type": "plain_text",
                                "text": `${outletCleaned}`
                            },
                            {
                                "type": "plain_text",
                                "text": `${titleCleaned}`
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "fields": [
                            
                            {
                                "type": "mrkdwn",
                                "text": "*Description*"
                            },
                            {
                                "type": "mrkdwn",
                                "text": "*Published On:*"
                            },
                            {
                                "type": "plain_text",
                                "text": `${descriptionCleaned}`
                            },
                            {
                                "type": "plain_text",
                                "text": `${pubdate}`
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "plain_text",
                            "text": " "
                        },
                        "accessory": {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Read Full Story"
                            },
                            "url":`${linkCleaned}`,
                            "value": "linkButton",
                            "action_id": "button"
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Save this Press Mention* (Select all that apply)"
                        },
                        "accessory": {
                            "type": "multi_static_select",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select items",
                                "emoji": true
                            },
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Mention",
                                        "emoji": true
                                    },
                                    "value": "Mention"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Reprint",
                                        "emoji": true
                                    },
                                    "value": "Reprint"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Cringeworthy",
                                        "emoji": true
                                    },
                                    "value": "Cringeworthy"
                                }
                            ]
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Discard this Press Mention:*"
                        },
                        "accessory": {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Discard",
                                },
                                "style": "danger",
                                "value": "discard"
                        }
                    },
                    {
                        "type": "divider"
                    }
                ]
            }) 
        }  
    }
});

