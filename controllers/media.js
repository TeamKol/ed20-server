'use strict'

const model = require('../model');
const db = require('../db');
const multer = require('multer');

module.exports = {
    uploadImage: function(req,res){
        
        let image = model.image;
        let newImage = new image();
        
        newImage.image_name = req.file.originalname;
        newImage.encoding: req.file.encoding;
        newImage.mimetype: req.file.mimetype;
        newImage.image: req.file.buffer;
        newImage.size: req.file.size;
        console.log(req.file);
        db.image.uploadImage(newImage);
        res.redirect('/');
    },
    getImage: function(req,res){
        let id = req.params.id;
        db.image.getImage(id,function(item){
            res.contentType(item[0].mimetype);
            res.send(item[0].image);
        });
    }
}