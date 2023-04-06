const pug = require('pug');

const user = {
    isAdmin : true
}

// Render
pug.renderFile('template.pug' ,{user}, (err, data) => {
    if (err) {
        res.writeHead(500, {'content-type' : 'text/plain'});
        res.end(err.message)
    }
    console.log(data);
})

// Compile
/*const compileTemplate = pug.compileFile('template.pug')
const result = compileTemplate({user})
console.log(result);*/
try {
    const compileTemplate = pug.compileFile('template.pug')
const result = compileTemplate({user})
console.log(result);
} catch (err) {
    res.writeHead(500, {'content-type' : 'text/plain'});
    res.end(err.message)
}