const FeedParser = require('feedparser')
const request = require('request')
const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);

module.exports = function FLDaily() {
    //Daily Serve of Content to Slack
    var reqFL = request('https://www.google.com/alerts/feeds/13227863141014072795/5506034848397168433')
    var feedparser = new FeedParser([]);

    reqFL.on('error', function (error) {
        console.log("FL Req Error")
        console.log(error)
    })

    reqFL.on('response', function(res) {
        var streamFL = this;

        if (res.statusCode !== 200) {
            this.emit('error', new Error('Bad status code'))
        } else {
            streamFL.pipe(feedparser);
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