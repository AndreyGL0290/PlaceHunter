// Import
const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

// Set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
     res.render('index');
})

// Listen on port 8080
app.listen(port);