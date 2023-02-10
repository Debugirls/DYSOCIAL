var express = require ('express');
var router = express.Router();
var uploadFile = require('../controllers/multer')
console.log(uploadFile)



module.exports = function(app){
//localhost:8081/uploadImage
app.post('/uploadFile', uploadFile(), (req, res)=>{
    console.log(req.file);
    res.send('ok');
})
}
