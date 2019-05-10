require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const db = require('./models');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
	extended: false
}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
// Handlebars
app.engine(
	'handlebars',
	exphbs({
		defaultLayout: 'main'
	})
);
app.set('view engine', 'handlebars');
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
);
//Passport Stratergy
require('./passport/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
//Declare Global Variables
app.use((req, resp, next) => {

	resp.locals.user = req.user || null;
	next();
});

// Routes
require('./routes/listApiRoutes')(app);
require('./routes/listItemsApiRoutes')(app);
require('./routes/userApiRoutes')(app);
require('./routes/htmlRoutes')(app);
require('./routes/sharedApiRoute')(app);

let syncOptions = {
	force: false,
	alter: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
	syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
	app.listen(PORT, function () {
		console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
	});
});

module.exports = app;