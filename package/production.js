const express = require('express');
const fs = require('fs')
const https = require('https')
const favicon = require('express-favicon');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cer')
}, app).listen(port);
console.log("listen on port : " + port);
