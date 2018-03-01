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
    },
    getUserChannelData: function(req,res,next){
        controllers.channelController.getUserChannelData(req,res,function(items,blogItems){
            console.log(items);
            res.locals.channels = items;
            res.locals.blogItems = blogItems;
            return next();
        });
    },
    getProfileData: function getProfileData(req,res,next){
        controllers.userDataController.getProfileData(req,res,function(item){
            res.locals.profileData = item;
            return next();
        });
        
        
    },
    getChannelById: function getChannelById(req,res,next){
        controllers.channelController.getChannelById(req,res,function(item){
            console.log(JSON.stringify(item));
            res.locals.ChannelDataById = item;
            return next();
        });
    },
    checkParent: function checkParent(req,res,next){
        if(req.body.parent==='individual'&&req.body.parentId===req.session.userId){
            console.log('succ');
            return next();          
        }else{
            console.log('failed');
            res.redirect('/');
        }
    },

 }

 