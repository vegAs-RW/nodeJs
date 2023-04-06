const fs = require('fs');
const http = require('http');

http.createServer(function(req, res) {
    fs.readFile(__dirname + req.url, (err, data) => {
        if (err) {
            res.writeHead(400)
            res.end(JSON.stringify(err))
            return;
        }

        res.writeHead(200)
        res.end(data)
    })
}).listen(8000)