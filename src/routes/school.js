const {Router} = require('express');
const {checkNotAuth} = require('../middlewares/isAuth');

const router = Router();

router.get('/', checkNotAuth, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
});

module.exports = router;