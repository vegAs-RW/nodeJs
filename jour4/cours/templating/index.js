const pug = require('pug');

// compile 
/*const template = `
if age >=18
    h1 access granted !
else 
    h1 permission denied !
`;*/

//const compileTemplate = pug.compile(template);
//let result = compileTemplate({age : 18})

//const compileTemplate = pug.compileFile('template.pug')
//const result = compileTemplate({age: 8})
//console.log(result);


// render
// Sans fichier externe
/*pug.render(template, {age : 19}, (err, data) => {
    if (err) {
        //res.writeHead(500, {'content-type' : 'text/plain'});
        //res.end(err.message)
        throw err
    }
    console.log(data);
})*/

// Avec fichier externe
pug.renderFile('template.pug', {age : 19}, (err, data) => {
    if (err) throw err
    console.log(data);
})

// Gestion des erreurs
try {
    const compileTemplate = pug.compileFile('template.pug');
} catch (err){
    res.writeHead(500, {'content-type' : 'text/plain'});
    res.end(err.message)
}

