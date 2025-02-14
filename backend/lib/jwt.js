const util = require('util');
const jsonwebtoken = require('jsonwebtoken');

const verify = util.promisify(jsonwebtoken.verify);
const sign = util.promisify(jsonwebtoken.sign);

const jwt = {
    verify,
    sign
};

module.exports = jwt;