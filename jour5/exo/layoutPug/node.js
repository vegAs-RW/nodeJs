const pug = require('pug');

const menuItems = [
    { path: '/', title: 'Home', isActive: true },
    { path: '/about-me', title: 'About', isActive: false },
    { path: '/references', title: 'References', isActive: false },
    { path: '/contact-me', title: 'Contact', isActive: false },
];

pug.renderFile('./view/template.pug' ,{pretty: true, menuItems},  (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data);
})
