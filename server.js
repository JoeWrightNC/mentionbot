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
const schedule = require('node-schedule');
const ArizonaFactory = require('./factories/ArizonaFactory');
const ColoradoFactory = require('./factories/ColoradoFactory');
const FloridaFactory = require('./factories/FloridaFactory');
const GeorgiaFactory = require('./factories/GeorgiaFactory');
const MaineFactory = require('./factories/MaineFactory');
const MarylandFactory = require('./factories/MarylandFactory');
const MichiganFactory = require('./factories/MichiganFactory');
const NevadaFactory = require('./factories/NevadaFactory');
const NorthCackFactory = require('./factories/NorthCackFactory');
const PennsylvaniaFactory = require('./factories/PennsylvaniaFactory');
const VirginiaFactory = require('./factories/VirginiaFactory');
const WisconsinFactory = require('./factories/WisconsinFactory');

//connect to DB
connection.connect();

//crank that server
const app = new Express()
app.use(Express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("handlebars", exphbs({ defaultLayout: "main",helpers: require('./config/helpers') }));
app.set("view engine", "handlebars");

//configure environment on Heroku
const {SLACK_TOKEN: slackToken, PORT} = process.env

const port = PORT ||  80

const Arizona = ArizonaFactory();
const Colorado = ColoradoFactory();
const Florida = FloridaFactory();
const Georgia = GeorgiaFactory();
const Maine = MaineFactory();
const Maryland = MarylandFactory();
const Michigan = MichiganFactory();
const Nevada = NevadaFactory();
const NorthCack = NorthCackFactory();
const Pennysylvania = PennsylvaniaFactory();
const Virginia = VirginiaFactory();
const Wisconsin = WisconsinFactory();

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

var az = schedule.scheduleJob('00 10 19 * * *', function() {
    Arizona();
});
var co = schedule.scheduleJob('20 10 19 * * *', function() {
    Colorado();
});
var fl = schedule.scheduleJob('40 10 19 * * *', function() {
    Florida();
});
var ga = schedule.scheduleJob('00 11 19 * * *', function() {
    Georgia();
});
var me = schedule.scheduleJob('20 11 19 * * *', function() {
    Maine();
});
var md = schedule.scheduleJob('40 11 19 * * *', function() {
    Maryland();
});
var mi = schedule.scheduleJob('00 12 19 * * *', function() {
    Michigan();
});
var nv = schedule.scheduleJob('20 12 19 * * *', function() {
    Nevada();
});
var nc = schedule.scheduleJob('40 12 19 * * *', function() {
    NorthCack();
});
var pa = schedule.scheduleJob('00 13 19 * * *', function() {
    Pennsylvania();
});
var va = schedule.scheduleJob('20 13 19 * * *', function() {
    Virginia();
});
var wi = schedule.scheduleJob('40 13 19 * * *', function() {
    Wisconsin();
});