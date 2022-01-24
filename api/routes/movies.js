const express = require("express");
const router = express.Router();
var webtorrent = require('webtorrent');
var path = require('path');
var http = require('http');


const client = new webtorrent();

// Allow Cross - Origin requests
router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.use(express.static(path.join(__dirname, 'app')));

var getLargestFile = function (torrent) {
  var file;
  for (i = 0; i < torrent.files.length; i++) {
    if (!file || file.length < torrent.files[i].length) {
      file = torrent.files[i];
    }
  }
  return file;
}

const getMP4 = torrent => torrent.files.find((file) => file.name.endsWith(".mp4"));

const buildMagnetURI = function (infoHash) {
  return 'magnet:?xt=urn:btih:' + infoHash + '&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';
};

router.get('/add/:infoHash', function (req, res) {
  if (typeof req.params.infoHash == 'undefined' || req.params.infoHash == '') {
    res.status(500).send('Missing infoHash parameter!'); return;
  }

  const torrent = buildMagnetURI(req.params.infoHash);
  try {
    if (client.get(torrent)) client.remove(torrent);

    client.add(torrent, function (torrent) {
      console.log("torrent added");
      res.status(201).send(req.params.infoHash);
    });

  } catch (err) {
    res.status(500).send('Error: ' + err.toString());
  }
});


router.get('/stream/:infoHash', function (req, res) {
  if (typeof req.params.infoHash == 'undefined' || req.params.infoHash == '') {
    res.status(500).send('Missing infoHash parameter!'); return;
  }
  try {

    const torrent = client.get(buildMagnetURI(req.params.infoHash));
    var file = getLargestFile(torrent);
    var total = file.length;

    if (typeof req.headers.range != 'undefined') {
      var range = req.headers.range;
      var parts = range.replace(/bytes=/, "").split("-");
      var partialstart = parts[0];
      var partialend = parts[1];
      var start = parseInt(partialstart, 10);
      var end = partialend ? parseInt(partialend, 10) : total - 1;
      var chunksize = (end - start) + 1;
    } else {
      var start = 0; var end = total;
    }

    var stream = file.createReadStream({ start: start, end: end });
    res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
    console.log("stream ready");
    stream.pipe(res);

  } catch (err) {
    res.status(500).send('Error: ' + err.toString());
  }
});

module.exports = router;
