const mongoose = require('mongoose');
module.exports = {
    getblogs: function(pageNumber,cb){
        mongoose.connection.db.collection('blogs').find({}).skip(pageNumber*10).limit(10).toArray(function(err,items){
            cb(items);
        });
    },
    getBlog: function(id,cb){
        /**
         * id is not a string in mongodb.need to use objectId function to convert string to id field
         */
        let o_id = mongoose.Types.ObjectId(id);
        mongoose.connection.db.collection('blogs').findOne({'_id': o_id}).then(function(item){
            cb(item);
        })
        
        
        
    }
}