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
const SmallFactory = require('./factories/SmallFactory');
const ColoradoFactory = require('./factories/ColoradoFactory');
const GreeneFactory = require('./factories/GreeneFactory');
const GriegoFactory = require('./factories/GriegoFactory');
const FloridaFactory = require('./factories/FloridaFactory');
const RadoFactory = require('./factories/RadoFactory');
const GeorgiaFactory = require('./factories/GeorgiaFactory');
const McCoshFactory = require('./factories/McCoshFactory');
const MaineFactory = require('./factories/MaineFactory');
const MarylandFactory = require('./factories/MarylandFactory');
const KurtzFactory = require('./factories/KurtzFactory');
const MichiganFactory = require('./factories/MichiganFactory');
const DemasFactory = require('./factories/DemasFactory');
const NevadaFactory = require('./factories/NevadaFactory');
const JacksonFactory = require('./factories/JacksonFactory');
const NorthCackFactory = require('./factories/NorthCackFactory');
const SchofieldFactory = require('./factories/SchofieldFactory');
const PennsylvaniaFactory = require('./factories/PennsylvaniaFactory');
const MicekFactory = require('./factories/MicekFactory')
const VirginiaFactory = require('./factories/VirginiaFactory');
const ZulloFactory = require('./factories/ZulloFactory');
const WisconsinFactory = require('./factories/WisconsinFactory');
const ConniffFactory = require('./factories/ConniffFactory');

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

const Arizona = ArizonaFactory;
const Small = SmallFactory;
const Colorado = ColoradoFactory;
const Greene = GreeneFactory;
const Griego = GriegoFactory;
const Florida = FloridaFactory;
const Rado = RadoFactory;
const Georgia = GeorgiaFactory;
const McCosh = McCoshFactory;
const Maine = MaineFactory;
const Maryland = MarylandFactory;
const Kurtz = KurtzFactory;
const Michigan = MichiganFactory;
const Demas = DemasFactory;
const Nevada = NevadaFactory;
const Jackson = JacksonFactory;
const NorthCack = NorthCackFactory;
const Schofield = SchofieldFactory;
const Pennsylvania = PennsylvaniaFactory;
const Micek = MicekFactory;
const Virginia = VirginiaFactory;
const Zullo = ZulloFactory;
const Wisconsin = WisconsinFactory;
const Conniff = ConniffFactory;

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

//Kurtz();

var cron = schedule.scheduleJob('00 13 * * *', function() {
    Arizona();
    setTimeout(() => {
        Small();
    }, 10000);
    setTimeout(() => {
        Colorado();
    }, 20000);
    setTimeout(() => {
        Greene();
    }, 30000);
    setTimeout(() => {
        Griego();
    }, 40000);
    setTimeout(() => {
        Florida();
    }, 50000);
    setTimeout(() => {
        Rado();
    }, 60000);
    setTimeout(() => {
        Georgia();
    }, 70000);
    setTimeout(() => {
        McCosh();
    }, 80000);
    setTimeout(() => {
        Maine();
    }, 90000);
    setTimeout(() => {
        Maryland();
    }, 100000);
    setTimeout(() => {
        Kurtz();
    }, 110000);
    setTimeout(() => {
        Michigan();
    }, 120000);
    setTimeout(() => {
        Demas();
    }, 130000);
    setTimeout(() => {
        Nevada();
    }, 140000);
    setTimeout(() => {
        Jackson();
    }, 150000);
    setTimeout(() => {
        NorthCack();
    }, 160000);
    setTimeout(() => {
        Schofield();
    }, 170000);
    setTimeout(() => {
        Pennsylvania();
    }, 180000);
    setTimeout(() => {
        Micek();
    }, 190000);
    setTimeout(() => {
        Virginia();
    }, 200000);
    setTimeout(() => {
        Zullo();
    }, 210000);
    setTimeout(() => {
        Wisconsin();
    }, 220000);
    setTimeout(() => {
        Conniff();
    }, 230000);
});