var express = require ('express');
var router = express.Router();
var uploadFile = require('../controllers/multer')
console.log(uploadFile)



module.exports = function(app){
//http://localhost:8081/uploadFile
app.post('/api/uploadFile', uploadFile(), (req, res)=>{
    console.log(req.file);
    res.send('ok');
})
}
