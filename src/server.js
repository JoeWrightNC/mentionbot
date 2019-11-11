// src/server.js

//gather the modules
const Express = require('express')
const bodyParser = require('body-parser')
const FeedParser = require('feedparser')
const request = require('request')
const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);
const path = require('path');
const mysql = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);

//connect to DB
connection.connect();
let createMentions = `create table if not exists mentions(
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    outlet VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    desc VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    tags VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
    )`; 

connection.query(createMentions, function (err, results, fields) {
    if (err) {
        console.log(err.message);
    }
});
//crank that server
const app = new Express()
app.use(bodyParser.urlencoded({extended: true}))

//configure environment on Heroku
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

app.use(Express.static(path.join(__dirname)));
app.use("/assets/styles", Express.static(__dirname + '/assets/styles'));
app.use("/assets/scripts", Express.static(__dirname + '/assets/scripts'));

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

app.post('/', (req, res) => {
    res.sendStatus(200);
    var parsedPayload = JSON.parse(req.body.payload);
    
    switch(parsedPayload.actions[0].type) {
        case "button":
            if (parsedPayload.actions[0].style == "danger") {
                request.post(parsedPayload.response_url, {
                    json: {
                        "replace_original": true,
                        "text": "You Have Discarded This Press Mention."
                    }
                }, (error, res, body) => {
                    if (error) {
                      console.error(error)
                      return
                    }
                    console.log(`statusCode: ${res.statusCode}`)
                    console.log(body)
                }) 
            }
        break;
        case "multi_static_select":
            var message = parsedPayload.message.blocks;
            var dbOutlet = message[1].fields[2].text;
            var dbTitle = message[1].fields[3].text;
            var dbPubdate = message[2].fields[3].text;
            var dbDesc = message[2].fields[2].text;
            var dbLink = message[3].accessory.url;
            var tagsArr = parsedPayload.actions[0].selected_options
            var tags = [];
            tagsArr.forEach(function(tag){
                tags.push(tag.value)
            })
            var dbTags = tags.join(", ")
 
            var insertStatement =   `INSERT INTO mentions(outlet,title,date,desc,link,tags) 
                                    VALUES (${dbOutlet},${dbTitle},${dbPubdate},${dbDesc},${dbLink}, ${dbTags})`
            connection.query(insertStatement, function(err, rows, fields) {
                if (err) throw err;
                console.log("confirmation of DB Write")
                console.log("Outlet");
                console.log(rows[0].outlet);
                console.log("Title");
                console.log(rows[0].title);
                console.log("Pubdate");
                console.log(rows[0].date);
                console.log("Desc");
                console.log(rows[0].desc);
                console.log("Link");
                console.log(rows[0].link);
                console.log("tags");
                console.log(rows[0].tags);
            })
            request.post(parsedPayload.response_url, {
                json: {
                    "replace_original": true,
                    "text": "Press Mention Successfully Saved!"
                }
            }, (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log(`statusCode: ${res.statusCode}`)
                console.log(body)
            }) 
        break;
    }
}) 

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})
