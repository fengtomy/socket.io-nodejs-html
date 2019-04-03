const express = require('express'),
  sio = require('socket.io'),
  http = require('http'),
  fs = require('fs');

const app = express();
const index = require('./router');

app.use('/index', index);
app.get('/socket.io.js', (req, res, next) => {
  fs.readFile('./public/socket.io.js', (err, files) => {
    if (err) {
      return renderErr(res, err);
    }
    renderFile(res, files, 'text/javascript');
  });
});

const server = http.createServer(app).listen(3000);
const io = sio.listen(server);

let connector = {};
io.sockets.on('connection', socket => {
  socket.on('message', data => {
    const {
      message,
      user
    } = data;
    if (!connector.user) {
      connector.user = [];
    }
    connector.user.push(message);
    // console.log(`${user}: ${message}`);
    io.sockets.emit('talkUnit', {
      message,
      user
    });
  });
});

function renderFile(res, files, type) {
  res.writeHead(200, {
    'Content-Type': type
  });
  res.end(files);
}
function renderErr(res, err) {
  res.end(err);
}