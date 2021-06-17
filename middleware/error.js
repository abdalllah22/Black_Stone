const winston = require('winston');


function error(err, req, res, next) {
    res.status(500).json({
        status: "Something failed at the server.",
        message: err,
    })
    winston.log('error', err.message);
}

module.exports = error