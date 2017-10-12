'user strict'
const connection = require('./connection');
const insert = require('./insert');

/**
 * exposes all connection funtions here
 */
module.exports.connection = connection;
module.exports.insert = insert;