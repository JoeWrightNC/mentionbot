// src/server.js

//gather the modules
const Express = require('express')
const bodyParser = require('body-parser')
const FeedParser = require('feedparser')
const request = require('request')
const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);

//crank that server
const app = new Express()
app.use(bodyParser.urlencoded({extended: true}))

//configure environment once on Heroku, leave commented out for now
const {SLACK_TOKEN: slackToken, PORT} = process.env

if (!slackToken) {
  console.error('missing environment variables SLACK_TOKEN')
  process.exit(1)
}

const port = PORT ||  80

//say hello world, but more useful
app.listen(port, () => {
    console.log(`Server started at localhost:${port}`)
})


//easily call our factories to work as we route
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
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `*New Mention of ${outletCleaned}* \n*Title:* ${titleCleaned}\n*Published On:* ${pubdate}\n*Description:* ${descriptionCleaned}\n*Read More:* ${linkCleaned}`
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Select Mention Type* (Select all that apply)"
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
                                    "value": "mention"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Reprint",
                                        "emoji": true
                                    },
                                    "value": "reprint"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Cringeworthy",
                                        "emoji": true
                                    },
                                    "value": "cringe"
                                }
                            ]
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Save this Press Mention:*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Save",
                                    "emoji": true
                                },
                                "value": "save"
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Discard",
                                    "emoji": true
                                },
                                "value": "discard"
                            }
                        ]
                    },
                    {
                        "type": "divider"
                    }
                ]
            }) 
        }  
    }
});

app.post('/', (req, res) => {
    //console.log(req.body);
    res.sendStatus(200);
    var parsedPayload = JSON.parse(req.body.payload);
    request.post(parsedPayload.response_url, {
        json: {
            "replace_original": "true",
            "text": "Thanks for selecting those!  Don't forget to click Save"
        }
    }, (error, res, body) => {
        if (error) {
          console.error(error)
          return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
    }) 
    /* switch(req.body.command) {
        case "/hippostart":
            hippostart(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break;
    } */
}) 

