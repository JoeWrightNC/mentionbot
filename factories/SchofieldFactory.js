const FeedParser = require('feedparser')
const request = require('request')
const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);

module.exports = function SchofieldDaily() {
    //Daily Serve of Content to Slack
    var reqSchofield = request('https://www.google.com/alerts/feeds/13227863141014072795/14560476017718825526')
    var feedparser = new FeedParser([]);

    reqSchofield.on('error', function (error) {
        console.log("AZ Req Error")
        console.log(error)
    })

    reqSchofield.on('response', function(res) {
        var streamSchofield = this;

        if (res.statusCode !== 200) {
            this.emit('error', new Error('Bad status code'))
        } else {
            streamSchofield.pipe(feedparser);
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

            outletCleaned = outlet.replace('Google Alert - ','');
            titleCleaned = title.replace('&#39;',"'").replace('&lt;b&gt;','').replace('&lt;/b&gt;','').replace('<b>','').replace('</b>','');
            descriptionCleaned = description.replace('&#39;'," ").replace('&lt;b&gt;','').replace('&lt;/b&gt;','').replace('&nbsp;',' ').replace('<b>','').replace('</b>','');
            linkCleanedSub = link.split('&url=')[1];
            linkCleaned = linkCleanedSub.split('&ct=ga')[0];
            domainCleanedSub = link.split('&url=')[1];
            domainCleanedCom = domainCleanedSub.split('.com')[0];
            domainCleaned = domainCleanedCom.split('.org')[0];

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
                            "fields": [
                                
                                {
                                    "type": "mrkdwn",
                                    "text": "*Domain*"
                                },
                                {
                                    "type": "mrkdwn",
                                    "text": " "
                                },
                                {
                                    "type": "plain_text",
                                    "text": `${domainCleaned}`
                                },
                                {
                                    "type": "plain_text",
                                    "text": " "
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
                                            "text": "External Reprint",
                                            "emoji": true
                                        },
                                        "value": "External_Reprint"
                                    },
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": "Internal Reprint",
                                            "emoji": true
                                        },
                                        "value": "Internal_Reprint"
                                    },
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": "Appearance",
                                            "emoji": true
                                        },
                                        "value": "Appearance"
                                    },
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": "Bigtime",
                                            "emoji": true
                                        },
                                        "value": "Bigtime"
                                    },
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": "Cringeworthy",
                                            "emoji": true
                                        },
                                        "value": "Cringeworthy"
                                    },
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": "Letter to the Editor",
                                            "emoji": true
                                        },
                                        "value": "Editor_Letter"
                                    },
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": "Aggregation",
                                            "emoji": true
                                        },
                                        "value": "Aggregation"
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
}