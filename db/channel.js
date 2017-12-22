'user strict'
const mongoose = require('mongoose');

module.exports = {
    createNewChannel: function (doc, cb) {
        doc.save(function (err) {
            console.log('i am here');
            if (err == 'E11000') {
                console.log(1)
                cb({ status: false, message: 'channel name must be unique' });
            }
            else if (err) {
                console.log(err)
                cb({ status: false, message: 'some error occured' });
            } else {
                console.log(3)
                cb({ status: true, message: 'channel successfully created...:' })
            }
        });
    },
    getUserChannelData: function (UserId, cb) {
        mongoose.connection.db.collection('channels').find({ 'channelOwner.ownerId': UserId }).toArray(function (err, items) {
            if(err) throw err;
            if (items != null && items.length > 0) {
                cb(items);
            }
        });
    },
    getChannelById: function(ChannelId, cb){
        let c_id = mongoose.Types.ObjectId(ChannelId);
        mongoose.connection.db.collection('channels').findOne({'_id': c_id}).then(function(item){
            console.log(item);
            cb(item);
        });
    },
}