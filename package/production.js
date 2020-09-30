const express = require('express');
// const fs = require('fs')
const http = require('http')
const fs = require('fs')
const favicon = require('express-favicon');
const cluster = require('cluster')
const cpuM = require('os').cpus().length
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) { res.sendFile(path.join(__dirname, 'build', 'index.html')); });

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < cpuM; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} is died`);
    })
} else {
    http.createServer(
        // {
        //     key: fs.readFileSync('/home/dy/Documents/projets/winhealth/app/package/server.key'),
        //     cert: fs.readFileSync('/home/dy/Documents/projets/winhealth/app/package/server.cer')
        // },
        app).listen(port);
    console.log(`Worker ${process.pid} is running`);
}



//     {
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.cer')
// },

