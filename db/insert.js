'user strict'
const mongoose = require('mongoose');
const connection = require('./connection');

module.exports={
    createNewChannel: function(doc){
        doc.save(function(err){
            if(err) throw err;
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
