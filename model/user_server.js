'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const user = new Schema({
    userName: {type:String, required:true},
    name: {type:String},
    email: {type: String, required:true},
    password: {type: String, required:true},
    shortBio: {type:String},
    channel: [],
    bookmarks: [],
    recomended: [],
    comments: [],
    history: []
});

//middle ware methods
// generating a hash
user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('userServer',user);