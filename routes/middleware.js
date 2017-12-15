/**
 * middlewares for routes
 */
const controllers = require('../controllers');

 module.exports={
      //is loggend in function
     isLoggedIn: function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            //console.log(res.locals.items);
            res.render('home',{town: 'world!!!',data: res.locals.items});
        }
    },
    getallblogs: function getallblogs(req,res,next){
        controllers.blogController.getblogs(req,res,function(items){
            res.locals.items = items;
            return next();
        });
    },
    getDashBoardData: function getDashBoardData(req,res,next){
        controllers.userDataController.getBlogData(req,res,function(item){
            res.locals.userBlogs = item;
            return next();
        });
    }

 }

 