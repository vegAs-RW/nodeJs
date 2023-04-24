const pug = require('pug');

const loggedUser = {
    name: {
        first: 'Jean',
        last: 'Dupont',
    },
    age: 36,
    birthdate: new Date('1986-04-18'),
    location: {
        zipcode: '77420',
        city: 'Champs-sur-Marne',
    },
    isAdmin: true
};

// Format the last name
const upperName = loggedUser.name.last.toUpperCase()

// Format the date
const getDate = (date) =>{
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
}
const newDate = loggedUser.birthdate
const formattedDate = getDate(newDate)


pug.renderFile('template.pug' ,{pretty: true, loggedUser, formattedDate, upperName},  (err, data) => {
    if (err) {
        res.writeHead(500, {'content-type' : 'text/plain'});
        res.end(err.message)
    }
    console.log(data);
})
