const multer = require('multer')

function upploadImage(){
    const storage = multer.diskStorage({
        destination: './public/files',
      
        filename: function (_req, file, cb) {
        const extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
          cb(null, Date.now() + extension);
        }
      })

      const upload = multer({ storage: storage }).single('image')
      
      return upload;
      

}

module.exports = upploadImage;




