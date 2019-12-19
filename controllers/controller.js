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
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Arizona Mirror','Az Mirror','Jim Small','"Arizona Mirror",'"Az Mirror"','"Jim Small"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("arizona", hbsObject)
    })
})

router.get("/colorado", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Colorado Independent','Susan Greene','Tina Greigo','"Colorado Independent"','"Susan Greene"','"Tina Griego"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("colorado", hbsObject)
    })
})

router.get("/florida", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Florida Phoenix','Diane Rado','"Florida Phoenix"','"Diane Rado"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("florida", hbsObject)
    })
})

router.get("/georgia", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Georgia Recorder','John Mccosh','"Georgia Recorder"','"John Mccosh"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("georgia", hbsObject)
    })
})

router.get("/iowa", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('"Iowa Capital Dispatch"','"Kathie Obradovich"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("iowa", hbsObject)
    })
})


router.get("/maine", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Maine Beacon','"Maine Beacon"','"Lauren Mccauley"','"Mike Tipping"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("maine", hbsObject)
    })
})

router.get("/maryland", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Maryland Matters','Josh Kurtz','"Maryland Matters"','"Josh Kurtz"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("maryland", hbsObject)
    })
})

router.get("/michigan", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Michigan Advance','Susan Demas','"Michigan Advance"','"Susan Demas"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("michigan", hbsObject)
    })
})

router.get("/minnesota", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('"Minnesota Reformer"','"Patrick Coolican"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("minnesota", hbsObject)
    })
})


router.get("/nevada", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Nevada Current','Hugh Jackson','"Nevada Current"','"Hugh Jackson"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("nevada", hbsObject)
    })
})

router.get("/northcarolina", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Nc Policy Watch','Rob Schofield','"Nc Policy Watch"','"Rob Schofield"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("ncarolina", hbsObject)
    })
})

router.get("/ohio", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ("Ohio Capital Star"','"David Dewitt"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("ohio", hbsObject)
    })
})

router.get("/pennsylvania", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Pennsylvania Capital-star','John Micek','"Pennsylvania Capital-star"','"John Micek"','"Penn Capital-Star"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("pennsylvania", hbsObject)
    })
})

router.get("/statesnewsroom", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('"States Newsroom"','"Chris Fitzsimon"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("statesnewsroom", hbsObject)
    })
})

router.get("/virginia", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Virginia Mercury','Robert Zullo','"Virginia Mercury"','"Robert Zullo"');`

    connection.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("virginia", hbsObject)
    })
})

router.get("/wisconsin", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Wisconsin Examiner','Ruth Conniff','"Wisconsin Examiner"','"Ruth Conniff"');`

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

router.get("/postconfirmation", function(req,res) {
    res.render("postconfirmation")
})

router.post('/postmention', (req, res) => {
    res.redirect(301, '/postconfirmation');
    console.log(req.body);
    var dbPostOutlet = req.body.outlet;
    var dbPostcatchTitle = req.body.title;
    var dbPostTitle = dbPostcatchTitle.replace(",", " ")
    var dbPostPubdate = req.body.pubdate;
    var dbPostcatchDesc = req.body.descrip;
    var dbPostDesc = dbPostcatchDesc.replace(",", " ")
    var dbPostLink = req.body.link;
    var tags = req.body.tags;
    var dbPostTags
    if (Array.isArray(tags) == true) {
        dbPostTags = tags.join(" | ")
    } else {
        dbPostTags = tags
    }

    var insertStatement =`INSERT INTO mentions(outlet,title,pubdate,descrip,link,tags) 
VALUES("${dbPostOutlet}","${dbPostTitle}","${dbPostPubdate}","${dbPostDesc}","${dbPostLink}","${dbPostTags}");`

    connection.query(insertStatement, function(err, rows, fields) {
        if (err) throw err;
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
            var dbLink = message[4].accessory.url;
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

router.post('/commandcontrol', (req, res) => {
    switch(req.body.command) {
        case "/menniehelp":
            console.log("Help me Mennie!")
            break;
        case "/hippostop":
            hippostop(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break;
    }
})
module.exports = router;
