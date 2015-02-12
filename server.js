/* 
 * "the quantified self"
 * by david hartsough
 */

var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/test');

var averageDaySchema = mongoose.Schema({
    username: String,
    sleeping: Number,
    showering: Number,
    grooming: Number,
    peeing: Number,
    cooking: Number,
    eating: Number,
    driving: Number,
    walking: Number,
    biking: Number,
    riding: Number,
    chatting: Number,
    emailing: Number,
    texting: Number,
    calling: Number,
    gaming: Number,
    socialmedia: Number,
    browsing: Number,
    reading: Number,
    meetings: Number,
    working: Number,
    inclass: Number,
    tv: Number,
    household: Number,
    exercising: Number,
    hobby: Number,
    extra: Number
});
var AverageDay = mongoose.model('AverageDay', averageDaySchema);

app.get('/', function(req, res) {
  res.render('index', {
    title: 'The Quantified Day',
    description: 'Create a visual representation of your average day through its quantitative data!'
  });
});

var api = express.Router();

api.all('*', function(req, res, next) {
  console.log(req.method + ' ' + req.originalUrl);
  next();
});

api.get('/average-day', function(req, res) {
  AverageDay.find(function(err, days) {
    res.status(200).json(days);
  });
});

api.get('/average-day/:username', function(req,res) {
  AverageDay.findOne({'username': req.params.username}, function(err,day) {
    res.status(200).json(day);
  });
});

api.post('/average-day', function(req, res) {
  var averageDay = new AverageDay({
    username: req.body.username,
    sleeping: req.body.sleeping,
    showering: req.body.showering,
    grooming: req.body.grooming,
    peeing: req.body.peeing,
    cooking: req.body.cooking,
    eating: req.body.eating,
    driving: req.body.driving,
    walking: req.body.walking,
    biking: req.body.biking,
    riding: req.body.riding,
    chatting: req.body.chatting,
    emailing: req.body.emailing,
    texting: req.body.texting,
    calling: req.body.calling,
    gaming: req.body.gaming,
    socialmedia: req.body.socialmedia,
    browsing: req.body.browsing,
    reading: req.body.reading,
    meetings: req.body.meetings,
    working: req.body.working,
    inclass: req.body.inclass,
    tv: req.body.tv,
    household: req.body.household,
    exercising: req.body.exercising,
    hobby: req.body.hobby,
    extra: req.body.extra
  });
  averageDay.save(function(err, m) {
    res.status(200).json(m);
  });
});

// Put the API on a prefix
app.use('/api/v1', api);

// Add the express.static middleware
app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.listen(3000);
console.log("hey, go check out port 3000!")
