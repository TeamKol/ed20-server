'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * contains channel schema
 */

 var Channel = new Schema({
     channelName: {type: String, required: true },
     //ownerId: {type: String, required: true },
     channelDescription: {type: String},
     Authors: Array,
     Blogs: Array,
     Series: Array,
     subscripbers: Array,
     slug: {type: String}
 });

 module.exports = mongoose.model('Channel',Channel);