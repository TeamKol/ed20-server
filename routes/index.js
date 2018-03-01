 /**
 * routes of app
 */
const controllers = require('../controllers');
const middlewares = require('./middleware');
const url = require('url');
const multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
module.exports = function (app, passport) {
    /*image*/
    app.route('/upload/image').post(/*middlewares.isLoggedIn,*/upload.single('pic'),function(req,res){
        controllers.image.uploadImage(req,res);
    });
    app.route('/view/image').get(/*middlewares.isLoggedIn,*/function(req,res){
        controllers.image.getImage(req,res);
    });
    app.route('/').get(middlewares.getallblogs, middlewares.isLoggedIn, function (req, res) {
        //console.log(res.locals.items);
        res.render('home', { user: true, town: 'world!!!', data: res.locals.items });
    });

    app.route('/signin').get(function (req, res) {
        res.render('signin', { title: 'sigin or signup' });
    });
    // process the login form
    app.route('/login').post(passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/signin', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.route('/signup').post(passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signin', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    app.route('/logout').get(function (req, res) {
        req.logout();
        res.redirect('/');
    })

    /**
     *  channel
     */
    app.route('/newchannel').get(middlewares.isLoggedIn, function (req, res) {
        res.render('newChannel', { user: true });
    });
    app.route('/create/channel').post(middlewares.isLoggedIn, function (req, res) {
        controllers.channelController.createChannel(req, res, function (result) {
            res.redirect(url.format({
                pathname: "/view/dashboard",
                query: result
            }));
        });
    });
    app.route('/c/create/blog').post(middlewares.isLoggedIn,middlewares.getUserChannelData,function(req,res){
        let items = res.locals.channels;
        let id = items[0]._id + "";
        console.log(id + " " + req.body.parentId);
        if(id === req.body.parentId){
                controllers.blogController.createBlog(req, res);
            }else {
                res.redirect('/');
            }
        
    });
    app.route('/c/mychannel').get(middlewares.isLoggedIn,middlewares.getUserChannelData,function(req,res){
        let items = res.locals.channels;
        console.log(res.locals.blogItems);
        res.render('channel',{user: true, channelData: items[0],blogItems: res.locals.blogItems});
    });
    app.route('/c/:channelid').get(middlewares.isLoggedIn,middlewares.getChannelById,function(req,res){
        res.render('channel',{user: true, channelData: res.locals.ChannelDataById});
    });
    app.route('/c/:channelid/newblog').get(middlewares.isLoggedIn,function(req,res){
        res.render('createblog',{ user: true, authorName: req.session.userName, parent: 'channel', parentId: req.params.channelid, submitUrl: '/c/create/blog' });
    });
    
    /**
     * blog
     */
    app.route('/create/blog').post(middlewares.isLoggedIn,function (req, res) {
        controllers.blogController.createBlog(req, res);
        
    });
    app.route('/newblog').get(middlewares.isLoggedIn, function (req, res) {
        res.render('createblog', { user: true, authorName: req.session.userName, parent: 'individual', parentId: req.session.userId, submitUrl: '/create/blog' });
    });
    app.route('/:blogId').get(middlewares.isLoggedIn,function (req, res) {
        controllers.blogController.getBlog(req, res, function (item) {
            console.log(JSON.stringify(item));
            res.render('viewblog', { user: true, data: item });
        });
    });
    app.route('/p/edit/:blogId').get(middlewares.isLoggedIn, function (req, res) {
        controllers.blogController.getBlog(req, res, function (item) {
            //console.log(JSON.stringify(item));
            res.render('edit', { user: true, data: item });
        });
    });
    app.route('/p/save/:blogId').post(middlewares.isLoggedIn, function (req, res) {
        controllers.blogController.updateblog(req, res, flag, function (result) {
            if (result.result) {
                res.redirect('/p/edit/' + result.blogId);
            } else {
                res.redirect('/view/dashboard');
            }

        });
    });
    app.route('/p/publishblog/:blogId').post(middlewares.isLoggedIn, function (req, res) {
        let flag = true;
        controllers.blogController.updateblog(req, res, flag, function (result) {
            if (result.result) {
                res.redirect('/p/edit/' + result.blogId);
            } else {
                res.redirect('/view/dashboard');
            }

        });
    });
    app.route('/p/delete/:blogId').delete(middlewares.isLoggedIn, function (req, res) {
        controllers.blogController.deleteBlog(req, res);
    })

    /**
     * dashboard
     */
    app.route('/view/dashboard').get(middlewares.isLoggedIn, middlewares.getDashBoardData, middlewares.getUserChannelData, function (req, res) {
        res.render('dashboard', { user: true, userBlogs: res.locals.userBlogs, channelData: res.locals.channels, message: req.query.message });
    }); 
    /*
     Profile Page
    */
    app.route('/view/profile').get(middlewares.isLoggedIn,middlewares.getProfileData,function(req,res){
        res.render('profile',{user: true, profileData: res.locals.profileData});
    });

    app.route('/update/profile').post(middlewares.isLoggedIn,function(req,res){
        controllers.userDataController.updateProfileData(req,res);
        res.redirect('/');
    });
    /**
     * always keep this req path last
     */
    app.route('/*').all(function (req, res) {
        res.render('error', {layuout: false});
    });
 }
 
