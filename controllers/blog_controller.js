const model = require('../model');
const db = require('../db');


module.exports={
    createBlog: function(req,res){
        const blogServer = model.blog;
        var newBlogServer = new blogServer();

        newBlogServer.title = req.body.title;
        
        newBlogServer.description = req.body.description;
        newBlogServer.content = req.body.content;
        newBlogServer.author.push({authorId:req.session.userId,authorName: 'durgakiran'});
        newBlogServer.keywords.push({keyword: req.body.keywords});
        db.insert.createNewBlog(newBlogServer);


    },
    getblogs: function(req,res,cb){
        let pageNumber = req.query.pagenumber || 0;
        db.blog.getblogs(pageNumber,function(items){
            cb(items);
        });
    },
    getBlog: function(req,res,cb){
        let blogId = req.params.blogId;
        db.blog.getBlog(blogId,function(item){
            cb(item);
        });
    }
}