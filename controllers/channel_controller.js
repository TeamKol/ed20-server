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
            cb(items);
        })
    }
}