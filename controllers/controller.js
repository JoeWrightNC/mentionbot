var express = require("express");
var router = express.Router();

var mentions = require("../models/mentions.js");

router.get("/", function(req,res) {
    mentions.selectAll(function(data) {
        var hbsObject = {
            mentions: data
        };
        res.render("index", hbsObject)
    })
})

router.post('/', (req, res) => {
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
            var dbcatchTitle = message[1].fields[3].text;
            var dbTitle = dbcatchTitle.replace(",", " ")
            var dbPubdate = message[2].fields[3].text;
            var dbcatchDesc = message[2].fields[2].text;
            var dbDesc = dbcatchDesc.replace(",", " ")
            var dbLink = message[3].accessory.url;
            var tagsArr = parsedPayload.actions[0].selected_options
            var tags = [];
            tagsArr.forEach(function(tag){
                tags.push(tag.value)
            })
            var dbTags = tags.join("+ ")
 
            var insertStatement =`INSERT INTO mentions(outlet,title,pubdate,descrip,link,tags) 
VALUES("${dbOutlet}","${dbTitle}","${dbPubdate}","${dbDesc}","${dbLink}","${dbTags}");`

            connection.query(insertStatement, function(err, rows, fields) {
                if (err) throw err;
                console.log("confirmation of DB Write")
                console.log(rows[0]);
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

module.exports = router;