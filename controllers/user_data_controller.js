const db = require('../db');

module.exports = {
    getBlogData: function(req,res,cb){
        console.log(req.session);
        let userId = req.session.userId;
        db.user.getBlogData(userId, function(item){
            cb(item);
        });        
    }
}