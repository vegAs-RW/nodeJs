require('dotenv').config()

console.log(process.env);
if (process.env.APP_EN) {
    console.log("Je suis en production");
} else {
    console.log("Je suis en développement");
}