'user strict'
const mongoose = require('mongoose');

module.exports={
    createNewChannel: function(doc){
        mongoose.connection.db.collection('channelServer').find({}).toArray(function(err,docs){
            console.log(docs);
        })
        doc.save(function(err){
            if(err=='E11000'){
                console.log('chanel name must be unique!!')
            }
            else if(err) {
                throw err;
            }else{
                
            }
        });
    },
    createNewBlog: function(doc){
        doc.save(function(err){
            if(err) throw err;

        })
    },
    createnewUser: function(doc){
        doc.save(function(err){
            if(err) throw err;

        })
    }
}
