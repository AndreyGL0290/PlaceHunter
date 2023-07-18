// Import
const { auth } = require('express-openid-connect');
const graphqlRouter = require('./routes/query');
const searchRouter = require('./routes/search');
const aboutRouter = require('./routes/about');
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

// Reads .env file
dotenv.config()

// Init variables
const app = express();

// Set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Logs
app.use(logger('dev'));

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use(express.json())

app.use(cookieParser())

const config = {
     authRequired: false,
     authRequired: false,
     auth0Logout: true
};

const port = process.env.PORT || 8080;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
     config.baseURL = `http://localhost:${port}`;
}

app.use(auth(config))

app.use(function (req, res, next) {
     res.locals.user = req.oidc.user;
     next();
});

app.use('/', authRouter);
app.use('/search', searchRouter);
app.use('/graphql', graphqlRouter);
app.use('/about', aboutRouter);

// Listen on port 8080
app.listen(port);