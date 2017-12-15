const model = require('../model');
const db = require('../db');


module.exports={
    createChannel: function(req,res){
        const channel = model.channelServer;
        var newChannel = new channel();
        newChannel.channelName = req.body.channelname;
        newChannel.channelDescription = req.body.description;
        newChannel.channelOwner.push({ownerId : req.session.user._id, ownerName: req.session.user.userName});

        db.connection.connection();//connection must be moved to server.js file
        db.insert.createNewChannel(newChannel);


    }
}