const multer = require('multer')
const path = require('path')


function upploadFile(){
    const storage = multer.diskStorage({
        destination:  function (req, file, cb) {
            cb(null, path.join(__dirname, '../public' ))
          },
      
        filename: function (_req, file, cb) {
        const extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
          cb(null, Date.now() + extension);
        }
      })

      const upload = multer({ storage: storage }).single('image')
      
      return upload;
      

}

module.exports = upploadFile;