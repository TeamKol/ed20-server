const db = require('../db');

module.exports = {
    getBlogData: function(req,res,cb){
        console.log(req.session);
        let userId = req.session.userId;
        db.user.getBlogData(userId, function(item){
            cb(item);
        });        
    },
    
        getProfileData: function(req,res,cb){
            console.log(req.session);
            let userId = req.session.userId;
            console.log(userId);
            db.user.getProfileData(userId, function(item){
                cb(item);
            });
        },
    
        updateProfileData: function(req,res){
            let userId = req.session.userId;
            db.user.updateProfileData(req,res,userId);
        }
}