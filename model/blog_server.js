'user strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blog = new Schema({
    slug: {type: String},
    title: {type: String,required: true},
    description: {type: String,required: true},
    content: {type: String,required: true},
    keywords:[],
    likes: {type: Number},
    author: {type: String,required: true},
    views: {type: Number},
    comments: {type: Array}
});

module.exports = mongoose.model('blogServer',blog);