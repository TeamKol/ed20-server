/**
 * routes of app
 */
const controllers = require('../controllers');
const middlewares = require('./middleware');

 module.exports = function(app,passport){
    app.route('/').get(middlewares.getallblogs,middlewares.isLoggedIn,function(req,res){
        //console.log(res.locals.items);
        res.render('home',{user: true,town: 'world!!!',data: res.locals.items});
    });

    app.route('/signin').get(function(req,res){
        res.render('signin',{title: 'sigin or signup'});
    });
    // process the login form
    app.route('/login').post(passport.authenticate('local-login', {
        successRedirect : '/', 
        failureRedirect : '/signin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.route('/signup').post(passport.authenticate('local-signup', {
        successRedirect : '/', 
        failureRedirect : '/signin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    app.route('/logout').get(function(req,res){
        req.logout();
		res.redirect('/');
    })

    /**
     * get channel list page
     */
    app.route('/mychannels').get(middlewares.isLoggedIn,function(req,res){
        res.render('mychannel',{user: true});
    });
    app.route('/mychannels/create/newchannel').get(middlewares.isLoggedIn,function(req,res){
        res.render('newChannel',{user: true});
    });
    app.route('/create/channel').post(middlewares.isLoggedIn,function(req,res){
        controllers.channelController.createChannel(req,res);
        res.redirect('/mychannels');
    });


    /**
     * blog
     */
    app.route('/create/blog').post(middlewares.isLoggedIn,function(req,res){
        controllers.blogController.createBlog(req,res);
        res.redirect('/');
    });
    app.route('/newblog').get(middlewares.isLoggedIn,function(req,res){
        res.render('createblog',{user: true});
    });
    app.route('/:blogId').get(function(req,res){
        controllers.blogController.getBlog(req,res,function(item) {
            //console.log(JSON.stringify(item));
            res.render('viewblog',{user:true,data: item});
        });
    });
    app.route('/p/edit/:blogId').get(middlewares.isLoggedIn,function(req,res){
        controllers.blogController.getBlog(req,res,function(item) {
            //console.log(JSON.stringify(item));
            res.render('edit',{user:true,data: item});
        });
    });
    app.route('/p/save/:blogId').post(middlewares.isLoggedIn,function(req,res){
        controllers.blogController.updateblog(req,res,flag,function(result){
            if(result.result){
                res.redirect('/p/edit/'+result.blogId);
            }else{
                res.redirect('/view/dashboard');
            }
            
        });
    });
    app.route('/p/publishblog/:blogId').post(middlewares.isLoggedIn,function(req,res){
        let flag = true;
        controllers.blogController.updateblog(req,res,flag,function(result){
            if(result.result){
                res.redirect('/p/edit/'+result.blogId);
            }else{
                res.redirect('/view/dashboard');
            }
            
        });
    })

    /**
     * dashboard
     */
    app.route('/view/dashboard').get(middlewares.isLoggedIn,middlewares.getDashBoardData,function(req,res){
        res.render('dashboard',{user: true,userBlogs: res.locals.userBlogs});
    });

 }
 