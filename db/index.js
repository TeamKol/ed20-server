'user strict'
const insert = require('./insert');
const blog = require('./blog');
const user = require('./user');
/**
 * exposes all connection funtions here
 */
module.exports.insert = insert;
module.exports.blog = blog;
module.exports.user = user;