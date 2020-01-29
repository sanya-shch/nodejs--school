const route = require('express').Router();

route.use('/auth', require('./auth'));
route.use('/school', require('./school'));
route.use('/school/student', require('./student'));
route.use('/school/teacher', require('./teacher'));
route.use('/school/group', require('./group'));
route.use('/school/lesson', require('./lesson'));

module.exports = {
    route
};