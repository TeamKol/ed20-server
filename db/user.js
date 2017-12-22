const mongoose = require('mongoose');
module.exports = {
    getBlogData: function(userId,cb){
        mongoose.connection.db.collection('blogs').aggregate([{$match:{"author.authorId":userId}},{$group: {_id:'$author.authorId',blogs:{$push: {title:'$title',description:'$description',id:'$_id'}}}}]).toArray(function(err,item){
            cb(item[0]);
        })
    },
    
        getProfileData: function(userId,cb){
            let o_id = mongoose.Types.ObjectId(userId);
            mongoose.connection.db.collection('userservers').findOne({'_id': o_id}).then(function(item){
                cb(item);
            })
            
        },
    
        updateProfileData: function(req, res, userId){
            let o_id = mongoose.Types.ObjectId(userId);
            let shortbio = req.body.shortbio;
            mongoose.connection.db.collection('userservers').findOneAndUpdate({'_id':o_id}, {$set:{"shortbio":shortbio}});
        }
}