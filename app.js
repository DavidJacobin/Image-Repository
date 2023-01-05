const express = require("express");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");
const mysql = require('mysql');

const app = express();

app.use(fileUpload());

app.use(express.static('public/'));
app.use(express.static('upload'));

app.engine("hbs", exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');



const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_profile'
});

pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected');
});




app.get('/', (req, res) => {
    

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected');


        connection.query('SELECT * FROM user WHERE id = "1"', (err, rows) => {

            connection.release();
            if(!err){
                 res.render('home', { rows });
            }

        });
    });

});
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

        
        pool.getConnection((err, connection) => {
            if (err) throw err
            console.log('connected');
    
    
            connection.query('UPDATE user SET profile_image = ? WHERE id="1"',[sampleFile.name], (err, rows) => {
    
                connection.release();
                if(!err){
                     res.redirect('/');
                }
    
            });
        });

        
    })


});


app.listen(5000, console.log("Server is listening!"))