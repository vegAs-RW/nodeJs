const http = require('http');
const hostname = 'localhost'
const port = 8000

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json')
    const date = new Date();

    const message = {message : `hello world ! ${date.toString()}`}
    console.log(JSON.stringify({message}));
    res.end(JSON.stringify({message}))
})

server.listen(port, hostname, () => {
    console.log(`server is running on http://${hostname}:${port}`);
})