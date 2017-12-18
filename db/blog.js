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
        
        
        
    },
    updateBlog: function(id,data,cb){
        let o_id = mongoose.Types.ObjectId(id);
        mongoose.connection.db.collection('blogs').updateOne({'_id':o_id},{$set:{"title":data.title,"description":data.description,"content":data.content, "publishflag":data.publishflag}}).then(function(result){
            cb(result);
        });
    },
    deleteBlog: function(blogId,userId,cb){
        let o_id = mongoose.Types.ObjectId(blogId);
        mongoose.connection.db.collection('blogs').deleteOne({'_id':o_id,'author.authorId':userId}).then(function(result){
            cb(result);
        });
    },
}