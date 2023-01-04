const express = require("express");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());
app.engine("hbs", exphbs.engine({ extname: '.hbs'}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});


app.listen(5000, console.log("Server is listening!"))