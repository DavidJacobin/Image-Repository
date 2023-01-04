const express = require("express");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());
app.engine("hbs", exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/', (req, res) => {

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded')
    };

    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/upload/' + sampleFile.name;

    sampleFile.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);

        res.send('File uploaded!')
    })


});


app.listen(5000, console.log("Server is listening!"))