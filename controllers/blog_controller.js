const model = require('../model');
const db = require('../db');


module.exports={
    createBlog: function(req,res){
        const blogServer = model.blogServer;
        var newBlogServer = new blogServer();

        newBlogServer.title = req.body.title;
        newBlogServer.slug = req.body.slug;
        newBlogServer.description = req.body.description;
        newBlogServer.content = req.body.content;
        newBlogServer.author = 'durgakiran';
        newBlogServer.likes = 0;
        newBlogServer.comments = 0;
        newBlogServer.views = 0;
        newBlogServer.keywords = req.body.keywords;

        db.connection.connection();
        db.insert.createNewBlog(newBlogServer);


    }
}