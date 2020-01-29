const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

require('dotenv').config({path:__dirname+'/./config/.env'});

const initializePassport = require('./middlewares/passport-config');

initializePassport(
    passport,
    email => Admin.find({email}),
    id => Admin.findById(id)
);

const app = express();

const PORT = process.env.PORT || 5000;

app.set('view-engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use('/', require('./routes').route);

(async () => {
    try {
        await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => console.log('App has been started...'));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
})();
