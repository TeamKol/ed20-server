'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * contains channel schema
 */
var owner = new Schema({
    ownerId : {type: String, required: true },
    ownerName : {type: String, required: true }
});
var editor = new Schema({
    editorId: {type: String, required: true },
    editorName: {type: String, required: true },
    status: {type: Boolean,required: true}
});
var blogs = new Schema({
    blogId: {type: String, required: true},
    
});
var series = new Schema({
    seriesId: {type: String, required: true}
});
var subscribers = new Schema({
    subscriberId: {type: String, required: true },
    notification: {type: Boolean, required: true}
});
 var channel = new Schema({
     channelName: {type: String, required: true, unique: true, validate: channelNameValidator },
     channelOwner: [owner],
     editors: [editor],                
     channelDescription: {type: String,default: 'that publishes awesome things'},
     
     Blogs: [blogs],
     Series: [series],
     subscripbers: [subscribers],
     fbLink: {type: String},
     channelType: {type:String, required: true, enum:['public','protected','paid'], default: 'public'}
 });

 function channelNameValidator(val){
    val = val.trim();
   if(val && val.length>4){
       return true;
   }else{
       return false;
   }
}

 module.exports = mongoose.model('channel',channel);
 