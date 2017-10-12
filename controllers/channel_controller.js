const model = require('../model');
const db = require('../db');


module.exports={
    createChannel: function(req,res){
        const channel = model.channelServer;
        var newChannel = new channel();

        newChannel.channelName = req.body.channelName;
        newChannel.slug = req.body.slug;
        newChannel.channelDescription = req.body.channelDescription;
        newChannel.author = 'durgakiran';

        db.connection.connection();
        db.insert.createNewChannel(newChannel);


    }
}