const express = require('express');
const { fstat } = require('fs');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Image = require('../models/image');
const fs = require('fs');

let store = multer.diskStorage({
    destination: './public/images/uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }

});

let upload = multer({
    storage: store,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }

});

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
        return cb(null, true);
    } else {
        return cb('error, images only');
    }
}



router.get('/upload', (req, res) => {
    res.render('upload');

});
router.get('/', (req, res) => {
    Image.find({})
        .then(images => {
            res.render('index', {
                images: images
            });

        })
});

router.post('/uploadSingle', upload.single('singleImage'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        return console.log('Please select an image');
    }

    let url = file.path.replace("public\\", '');

    Image.findOne({
            url: url
        })
        .then(img => {
            if (img) {
                console.log('Duplicate Image, try another image!');
                return res.redirect('/upload');
            }
            Image.create({
                    url: url
                })
                .then(img => {
                    console.log('Uploaded!')
                    res.redirect('/');
                })
                .catch(err => {
                    return console.log(err);
                })
        });
});

router.post('/uploadMultiple', upload.array('multipleImages'), (req, res, next) => {
    const files = req.files;

    if (!files) {
        return console.log('select images first!');
    }
    files.forEach(file => {
        let url = file.path.replace("public\\", '');
        Image.findOne({
                url: url
            })
            .then(async img => {
                if (img) {
                    return console.log('this image is duplicate')

                }
                await Image.create({
                    url: url
                });
            })
            .catch(err => {
                return console.log('error: ' + err);
            });
    });
    res.redirect('/');
});
router.delete('/delete/:id',(req,res)=>{
    let query = {_id:req.params.id};
    Image.findOne(query)
    .then(img=>{
        fs.unlink('./public/'+img.url,(err)=>{
            if(err) return console.log(err);
            Image.deleteOne(query)
            .then(pic=>{
                res.redirect('/');
            });
        });
    })
    .catch(err=>{
        console.log(err);
    })
});
module.exports = router;