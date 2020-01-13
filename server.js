//gather the modules
const Express = require('express')
const bodyParser = require('body-parser')
const FeedParser = require('feedparser') 
const request = require('request')
const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);
const path = require('path');
const mysql = require('mysql');
const pool = mysql.createPool(process.env.JAWSDB_MARIA_URL);
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
const DewittFactory = require('./factories/DewittFactory');
const OhioFactory = require('./factories/OhioFactory');
const PennFactory = require('./factories/PennFactory');
const MccauleyFactory = require('./factories/MccauleyFactory');
const TippingFactory = require('./factories/TippingFactory');
const FitzsimonFactory = require('./factories/FitzsimonFactory');
const SnrsFactory = require('./factories/StatesnewsroomFactory');
const IowaFactory = require('./factories/IowaFactory');
const ObradovichFactory = require('./factories/ObradovichFactory');
const MinnesotaFactory = require('./factories/MinnesotaFactory');
const CoolicanFactory = require('./factories/CoolicanFactory');

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
const Dewitt = DewittFactory;
const Ohio = OhioFactory;
const Penn = PennFactory;
const Mccauley = MccauleyFactory;
const Tipping = TippingFactory;
const Fitzsimon = FitzsimonFactory;
const Snrs = SnrsFactory;
const Iowa = IowaFactory;
const Obradovich = ObradovichFactory;
const Minnesota = MinnesotaFactory;
const Coolican = CoolicanFactory;

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

/*  web.chat.postMessage({
    channel: 'mentionbot',
    text: "HI!  It's me, Mennie, just letting you know Joe just pushed up code and I accepted it into my skill sets.  Have a great day and thanks for the fresh code!"
})    */

/* var cron = schedule.scheduleJob('00 13 * * *', function() {
  */    /*   Arizona();
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
        Iowa();
    }, 90000);
    setTimeout(() => {
        Obradovich();
    }, 100000);
    setTimeout(() => {
        Maine();
    }, 110000);
    setTimeout(() => {
        Mccauley();
    }, 120000);
    setTimeout(() => {
        Tipping();
    }, 130000);
    setTimeout(() => {
        Maryland();
    }, 140000);
    setTimeout(() => {
        Kurtz();
    }, 150000);
    setTimeout(() => {
        Michigan();
    }, 160000);
    setTimeout(() => {
        Demas();
    }, 170000);
    setTimeout(() => {
        Minnesota();
    }, 180000);
    setTimeout(() => {
        Coolican();
    }, 190000);
    setTimeout(() => {
        Nevada();
    }, 200000);
    setTimeout(() => {
        Jackson();
    }, 210000);
    setTimeout(() => {
        NorthCack();
    }, 220000);
    setTimeout(() => {
        Schofield();
    }, 230000);
    setTimeout(() => {
        Ohio();
    }, 240000);
    setTimeout(() => {
        Dewitt();
    }, 250000);
    setTimeout(() => {
        Pennsylvania();
    }, 260000);
    setTimeout(() => {
        Penn();
    }, 270000);
    setTimeout(() => {
        Micek();
    }, 280000);
    setTimeout(() => {
        Virginia();
    }, 290000);
    setTimeout(() => {
        Zullo();
    }, 300000);
    setTimeout(() => {
        Wisconsin();
    }, 310000);
    setTimeout(() => {
        Conniff();
    }, 320000);
    setTimeout(() => {
        Snrs();
    }, 330000);
    setTimeout(() => {
        Fitzsimon();
    }, 340000);     */
/* }); */