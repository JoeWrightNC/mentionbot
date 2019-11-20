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
const Pennsylvania = PennsylvaniaFactory();
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

var cron = schedule.scheduleJob('25 19 * * *', function() {
    Arizona();
    setTimeout(() => {
        Colorado();
    }, 5000);
    setTimeout(() => {
        Florida();
    }, 10000);
    setTimeout(() => {
        Georgia();
    }, 15000);
    setTimeout(() => {
        Maine();
    }, 20000);
    setTimeout(() => {
        Maryland();
    }, 25000);
    setTimeout(() => {
        Michigan();
    }, 30000);
    setTimeout(() => {
        Nevada();
    }, 35000);
    setTimeout(() => {
        NorthCack();
    }, 40000);
    setTimeout(() => {
        Pennsylvania();
    }, 45000);
    setTimeout(() => {
        Virginia();
    }, 50000);
    setTimeout(() => {
        Wisconsin();
    }, 55000);
});