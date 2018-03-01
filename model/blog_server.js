'user strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var author = new Schema({
    authorId: {type: String, required: true},
    authorName: {type: String, required: true}
});
var keywords = new Schema({
    keyword: {type: String, required: true}
});
var comments = new Schema({
    authorId: {type: String, required: true},
    test: {type: String},
    reaction: {type: String, enum: ['abuse','inappropriate']},
    upvotes: {type: Number,default: 0},
});
var parent = new Schema({
    p_type: {type: String, enum: ['individual', 'channel', 'series'], default: 'individual'},
    p_typeId: {type: String, required: true}
});



const blog = new Schema({
    
    title: {type: String,required: true},
    description: {type: String,required: true},
    content: {type: String,required: true},
    keywords:[keywords],
    author: [author],
    accesFlag: {type: String, enum: ['private','public'], default: 'public'},
    comments: [comments],
    likes: {type: Number,default: 0},
    views: {type: Number,default: 0},
    shares: {type: Number,default: 0},
    publishflag: {type: String, enum:['published','draft'], default: 'draft'},
    parent: {type: parent, required: true}
   
});

module.exports = mongoose.model('blog',blog);