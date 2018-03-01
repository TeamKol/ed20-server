'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var image = new Schema({
    image: {type: Buffer, required: true},
    image_name: {type: String, required: true},
    encoding: {type:String},
    mimetype: {type: String},
    size: {type:Number}
});

module.exports = mongoose.model('image', image);