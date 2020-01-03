const express = require("express");
const router = express.Router();
const request = require('request')
const mysql = require('mysql');
const pool = mysql.createPool(process.env.JAWSDB_MARIA_URL);
const MenniehelpFactory = require('../factories/slashFactories/MenniehelpFactory');
const MenniecountFactory = require('../factories/slashFactories/MenniecountFactory');
const MenniejokeFactory = require('../factories/slashFactories/MenniejokeFactory');

//Slash Command Factory Constants
const Menniehelp = MenniehelpFactory();
const Menniecount = MenniecountFactory();
const Menniejoke = MenniejokeFactory();

//Routes!
router.get("/", function(req,res) {
    var selectStatement =`SELECT * FROM mentions;`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("index", hbsObject)
    })
})

router.get("/arizona", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Arizona Mirror','Az Mirror','Jim Small');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("arizona", hbsObject)
    })
})

router.get("/colorado", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Colorado Independent','Susan Greene','Tina Greigo');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("colorado", hbsObject)
    })
})

router.get("/florida", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Florida Phoenix','Diane Rado');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("florida", hbsObject)
    })
})

router.get("/georgia", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Georgia Recorder','John Mccosh');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("georgia", hbsObject)
    })
})

router.get("/iowa", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Iowa Capital Dispatch','Kathie Obradovich');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("iowa", hbsObject)
    })
})


router.get("/maine", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Maine Beacon','Lauren Mccauley','Mike Tipping');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("maine", hbsObject)
    })
})

router.get("/maryland", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Maryland Matters','Josh Kurtz');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("maryland", hbsObject)
    })
})

router.get("/michigan", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Michigan Advance','Susan Demas');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("michigan", hbsObject)
    })
})

router.get("/minnesota", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Minnesota Reformer','Patrick Coolican');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("minnesota", hbsObject)
    })
})


router.get("/nevada", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Nevada Current','Hugh Jackson');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("nevada", hbsObject)
    })
})

router.get("/northcarolina", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Nc Policy Watch','Rob Schofield');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("ncarolina", hbsObject)
    })
})

router.get("/ohio", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Ohio Capital Journal','David Dewitt');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("ohio", hbsObject)
    })
})

router.get("/pennsylvania", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Pennsylvania Capital-star','John Micek','Penn Capital-Star');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("pennsylvania", hbsObject)
    })
})

router.get("/statesnewsroom", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('States Newsroom','Chris Fitzsimon');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("statesnewsroom", hbsObject)
    })
})

router.get("/virginia", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Virginia Mercury','Robert Zullo');`

    pool.query(selectStatement, function(err, rows, fields) {
        var hbsObject = {
            mentions: rows.reverse()
        };
        res.render("virginia", hbsObject)
    })
})

router.get("/wisconsin", function(req,res) {
    var selectStatement =`SELECT * FROM mentions WHERE outlet IN ('Wisconsin Examiner','Ruth Conniff');`

    pool.query(selectStatement, function(err, rows, fields) {
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

    pool.query(insertStatement, function(err, rows, fields) {
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
            var dbOutlet = message[1].fields[2].text.replace('"','').replace('"','');
            var dbcatchTitle = message[1].fields[3].text;
            var dbTitle = dbcatchTitle.replace(",", " ").replace("'","")
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
VALUES('${dbOutlet}','${dbTitle}','${dbPubdate}','${dbDesc}','${dbLink}','${dbTags}');`

            pool.query(insertStatement, function(err, rows, fields) {
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
            Menniehelp(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break;
        case "/menniecount":
            Menniecount(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break;
        case "/menniejoke":
            Menniejoke(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break; 
    }
})
module.exports = router;
