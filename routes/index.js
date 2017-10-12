/**
 * routes of app
 */
const controllers = require('../controllers');

 module.exports = function(app,passport){
    app.route('/').get(function(req,res){
        res.render('home',{town: 'world!!!'});
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

    app.route('/create/blog').post(function(req,res){
        controllers.blogController.createBlog(req,res);
        res.end('ok!!');
    });

    app.route('/create/channel').post(function(req,res){
        controllers.channelController.createChannel(req,res);
        res.end('ok!!');
    });

    app.route('/htmltest').get(function(req,res){
        res.render('createblog');
    });
    app.route('/createnew').get(function(req,res){
        res.render('createnew');
    })

 }
 