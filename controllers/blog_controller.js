const model = require('../model');
const db = require('../db');


module.exports={
    createBlog: function(req,res){
        const blogServer = model.blog;
        var newBlogServer = new blogServer();

        
        console.log(req.body.parent);
        if(req.body.parent=='individual' || req.body.parent=='channel'){
            console.log(2);
            if(req.body.parentId==req.session.userId){
                newBlogServer.parent = {p_type: req.body.parent, p_typeId: req.body.parentId};
            }else if(req.body.parent=='channel'){
                newBlogServer.parent = {p_type: req.body.parent, p_typeId: req.body.parentId};
            }
            newBlogServer.title = req.body.title;
        newBlogServer.accesFlag = req.body.accessFlag;
        newBlogServer.description = req.body.description;
        newBlogServer.content = req.body.content;
        newBlogServer.author.push({authorId:req.session.userId,authorName: req.session.userName});
        newBlogServer.keywords.push({keyword: req.body.keywords});
        db.insert.createNewBlog(newBlogServer);
        res.redirect('/');
        
        }else{
            res.redirect('/')
        }
        
        

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
        console.log(blogId);
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
    },
    deleteBlog: function(req,res){
        let blogId = req.params.blogId;
        let userId = req.session.userId;
        if(blogId){
            db.blog.deleteBlog(blogId,userId,function(result){
                if(result.deletedCount===1){
                    res.end('{"result": true}');
                }else{
                    res.end('{"result": false}');
                }
            });
        }else{
            res.redirect('/');
        }
        
    }
}