const express = require("express");
const router = express.Router();
const request = require('request')
const mysql = require('mysql');
const connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
const mentions = require("../models/mentions.js");

router.get("/", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("index", hbsObject)
    })
})

router.get("/arizona", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("arizona", hbsObject)
    })
})

router.get("/colorado", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("colorado", hbsObject)
    })
})

router.get("/florida", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("florida", hbsObject)
    })
})

router.get("/georgia", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("georgia", hbsObject)
    })
})

router.get("/maine", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("maine", hbsObject)
    })
})

router.get("/maryland", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("maryland", hbsObject)
    })
})

router.get("/michigan", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("michigan", hbsObject)
    })
})

router.get("/nevada", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("nevada", hbsObject)
    })
})

router.get("/northcarolina", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("ncarolina", hbsObject)
    })
})

router.get("/pennsylvania", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("pennsylvania", hbsObject)
    })
})

router.get("/virginia", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("virginia", hbsObject)
    })
})

router.get("/wisconsin", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("wisconsin", hbsObject)
    })
})

router.get("/newmention", function(req,res) {
        res.render("addmention")
})

router.post('/postmention', (req, res) => {
    res.sendStatus(200)
    console.log(req.body);
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
            var dbTags = tags.join(" | ")
 
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
