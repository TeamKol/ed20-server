'use strict'
const mongoose = require('mongoose');
const multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

module.exports = {
    uploadImage: function(newImage,cb){
        console.log(newImage);
        mongoose.connection.db.collection('image').insertOne(newImage).then(function(){
            mongoose.connection.db.collection('image').find({}).toArray(function(err,item){console.log(item);});
            cb('done')
        });
    },
    getImage: function(id,cb){
        let o_id = "5a97c9a9b5a49f188c222399";
        let iId = mongoose.Types.ObjectId(o_id);
        mongoose.connection.db.collection('image').find({"_id": iId}).toArray(function(err,item){
            if(err) throw err;
            cb(item);
        });
    }
}