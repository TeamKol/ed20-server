'use strict'

const model = require('../model');
const db = require('../db');
const multer = require('multer');

module.exports = {
    uploadImage: function (req, res) {

        let image = model.image;
        let newImage = new image();

        newImage.image_name = req.file.originalname;
        newImage.encoding = req.file.encoding;
        newImage.mimetype = req.file.mimetype;
        newImage.image = req.file.buffer;
        newImage.size = req.file.size;
        db.image.uploadImage(newImage, function (x) {
            console.log(newImage);
            if (x === 'done') res.redirect('/');
        });

    },
    getImage: function (req, res) {
        let id = req.params.id;
        db.image.getImage(id, function (item) {
            res.writeHead(200, {
                'Content-Type': item[0].mimetype
            });
            res.write(item[0].image.buffer);
            res.end();
        });
    }
}