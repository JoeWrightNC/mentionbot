const express = require("express");
const router = express.Router();
const request = require('request')
const mysql = require('mysql');
const connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
const mentions = require("../models/mentions.js");

router.get("/", function(req,res) {
    res.render("index", hbsObject)
})

router.get("/arizona", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows
        };
        res.render("arizona", hbsObject)
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
