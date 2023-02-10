var express = require ('express');
var router = express.Router();
var uploadFile = require('../middlewares/multer')


//localhost:8081/uploadImage
router.post('/uploadFile', uploadFile(), (req, res)=>{
    console.log(req.file);
    res.send('ok');
})

module.exports =' router;'
