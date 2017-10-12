'use strict'

const mongoose = require('mongoose');

module.exports = {
    connection: function(){mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true/* other options */});}
}