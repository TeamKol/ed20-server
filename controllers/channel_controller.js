'use strict'
const model = require('../model');
const db = require('../db');


module.exports={
    createChannel: function(req,res,cb){
        const channel = model.channelServer;
        var newChannel = new channel();
        newChannel.channelName = req.body.channelname;
        newChannel.channelDescription = req.body.description;
        newChannel.channelOwner = {ownerId : req.session.userId, ownerName: req.session.userName};
        db.channel.createNewChannel(newChannel, function(doc){
            cb(doc);    
        });
    },
    getUserChannelData: function(req,res,cb){
        db.channel.getUserChannelData(req.session.userId,function(items){
            let channelId = items[0]._id;
            console.log(channelId);
            db.blog.getChannelBlogs(channelId,0,function(blogitems){
                cb(items,blogitems);
            });
        });
    },
    getChannelById: function(req,res,cb){
        let channelId = req.params.channelid;
        console.log(channelId);
        channelId = ""+channelId;
        db.channel.getChannelById(channelId,function(item){
            cb(item);
        });
    },
}