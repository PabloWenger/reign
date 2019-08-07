const mongoose = require('mongoose');
const axios = require('axios');
const host = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
const express = require('express');
let cors = require('cors');
const bodyParser = require('body-parser');
const Data = require('./data');
const API_PORT = 3001;
const app = express();
const router = express.Router();
const dbRoute =
  'mongodb+srv://reign:Epv2TORGAk9tzS1Y@wenger-zwtmp.azure.mongodb.net/test?retryWrites=true&w=majority';
app.use(cors());
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
setInterval(getNews, 3600000);

//utility api for debug
router.get('/getNews', (req, res) => {
  getNews();
  return res.json({ success: true, message: 'done' });
});

function getUnique(arr, comp) {
  const unique = arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e]);

  return unique;
}

function getNews() {
  console.log('checking data...');
  console.log(Date.now());
  axios.get(host).then(resp => {
    const newsData = getUnique(resp.data.hits, 'objectID');
    newsData.forEach(element => {
      let post = new Data();
      let url = element.story_url || element.url;
      let title = element.story_title || element.title;
      Data.find({ id: element.objectID }, function(err, data) {
        let notExist = data.length === 0;
        if (err) return res.json({ success: false, error: err });
        if (notExist) {

          post.id = element.objectID;
          post.title = title;
          post.created_at = element.created_at;
          post.url = url;
          post.author = element.author;
          post.status = 1;
          post.save(error => {
            if (error) return res.json({ success: false, error: error });
          });
        }
      });
    });
  });
  console.log('done...');
}

router.get('/getData', (req, res) => {
  Data.find({ status: 1 }, function (err, data) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  }).sort('-created_at');
});

router.post('/deletePost', (req, res) => {
  const { id, update } = req.body;
  Data.updateOne({id: id}, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, message:'the post was deleted...' });
  });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`START - PORT ${API_PORT}`));
