const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/all') {
    const filePath = path.join(dataDir, 'all.json');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  }
   else if (parsedUrl.pathname.startsWith ('/search/')) {
    const name = parsedUrl.pathname.substring('/search/'.length);
    const filePath = path.join(dataDir, `${name}.json`);
    fs.readFile(filePath , (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('User not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Page not found');
  }
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

