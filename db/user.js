const mongoose = require('mongoose');
module.exports = {
    getBlogData: function(userId,cb){
        mongoose.connection.db.collection('blogs').aggregate([{$match:{"author.authorId":userId}},{$group: {_id:'$author.authorId',blogs:{$push: {title:'$title',description:'$description',id:'$_id'}}}}]).toArray(function(err,item){
            console.log(item.length);
            cb(item);
        })
    }
}