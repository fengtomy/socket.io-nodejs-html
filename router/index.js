const express = require('express'),
  fs = require('fs');

const router = express.Router();
router.get('/bear', (req, res) => {
  fs.readFile('./public/bear.html', (err, files) => {
    if (err) {
      return renderErr(res, err);
    }
    renderFile(res, files, 'text/html');
  });
});
router.get('/monkey', (req, res) => {
  fs.readFile('./public/monkey.html', (err, files) => {
    if (err) {
      return renderErr(res, err);
    }
    renderFile(res, files, 'text/html');
  });
});
router.get('/pig', (req, res) => {
  fs.readFile('./public/pig.html', (err, files) => {
    if (err) {
      return renderErr(res, err);
    }
    renderFile(res, files, 'text/html');
  });
});

function renderFile(res, files, type) {
  res.writeHead(200, {'Content-Type': type});
  res.end(files);
}
function renderErr(res, err) {
  res.end(err);
}

module.exports = router;