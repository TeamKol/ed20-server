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
    /**
     * multiple dependency method check before change or delete
     */
    getBlog: function(req,res,cb){
        let blogId = req.params.blogId;
        db.blog.getBlog(blogId,function(item){
            cb(item);
        });
    },
    updateblog: function(req,res,flag,cb){
        let data = {};
        if(flag == true){
            data.publishflag = 'published';
        }else{
            data.publishflag = 'draft';
        }
        let blogId = req.params.blogId;
        data.title = req.body.title;
        data.description = req.body.description;
        data.content = req.body.content;
        data.keyword =  req.body.keywords;
        db.blog.updateBlog(blogId,data,function(result){
            if(result.modifiedCount == 1){
                cb({result: true,blogId: blogId});
            }else{
                cb({result: false});
            }
        })
    }
}