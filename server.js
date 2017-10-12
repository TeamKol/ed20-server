const express = require('express');
const dotenv = require('dotenv').config();
const routes = require('./routes');
const hbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const bodyParser = require('body-parser');
const path = require('path');
const flash    = require('connect-flash');
const app = express();

/**
 * common error in setting view engine with handle bar
 * https://stackoverflow.com/questions/26454425/failed-to-lookup-view-in-directory-with-express-handlebars
 */
app.engine('hbs', hbs({extname: '.hbs',defaultLayout: 'layout', layoutsDir: __dirname +'/views/layout/'}));
app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'hbs');

/**
 * load static files
 */
app.use(express.static(path.join(__dirname,'/public/')));

require('./controllers/user_controller')(passport); 

app.use(session({
	secret: 'its a secret',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/**
 * importing routes
 */

app.set('routes',require('./routes'));
routes(app,passport);




app.listen(3005 || process.env.PORT);