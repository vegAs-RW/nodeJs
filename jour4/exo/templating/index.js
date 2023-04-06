const pug = require('pug');

const user = {
    isAdmin : true
}

// Render
pug.renderFile('template.pug' ,{user}, (err, data) => {
    if (err) throw err
    console.log(data);
})

// Compile
/*const compileTemplate = pug.compileFile('template.pug')
const result = compileTemplate({user})
console.log(result);*/