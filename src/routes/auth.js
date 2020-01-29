const {Router} = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const {checkAuth} = require('../middlewares/isAuth');

const router = Router();

router.get('/login', checkAuth, (req, res) => {
    res.render('login.ejs')
});

router.post('/login', checkAuth, passport.authenticate('local', {
    successRedirect: '/school',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.get('/register', checkAuth, (req, res) => {
    res.render('register.ejs')
});

router.post('/register', checkAuth, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // console.log({name: req.body.name, email: req.body.email, password: hashedPassword});
        const newAdmin = new Admin({name: req.body.name, email: req.body.email, password: hashedPassword});
        await newAdmin.save();

        res.redirect('/auth/login')
    } catch {
        res.redirect('/auth/register')
    }
});

router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/auth/login')
});

module.exports = router;