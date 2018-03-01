'use strict'
const mongoose = require('mongoose');
const multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

module.exports = {
    uploadImage: function(newImage){
        newImage.save(function(err){
            if(err) throw err;
            mongoose.connection.db.collection('image').find({}).toArray(function(err,item){
            if(err) throw err;
            console.log(item);
        })
        });
    },
    getImage: function(id,cb){
        mongoose.connection.db.collection('image').find({"_id": id}).toArray(function(err,item){
            if(err) throw err;
            cb(item);
        });
    }
}