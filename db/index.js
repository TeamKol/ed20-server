'user strict'
const insert = require('./insert');
const blog = require('./blog');
const user = require('./user');
const channel = require('./channel');
const image = require('./image');
/**
 * exposes all connection funtions here
 */
module.exports.insert = insert;
module.exports.blog = blog;
module.exports.user = user;
module.exports.channel = channel;
module.exports.image = image;