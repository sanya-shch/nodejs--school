const route = require('express').Router();

route.use('/auth', require('./auth'));
route.use('/school', require('./school'));

module.exports = {
    route
};