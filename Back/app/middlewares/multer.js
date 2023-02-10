import multer, { diskStorage } from 'multer';

function upploadImage(){
    const storage = diskStorage({
        destination:  function (req, file, cb) {
            cb(null, '/public/file')
          },
      
        filename: function (_req, file, cb) {
        const extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
          cb(null, Date.now() + extension);
        }
      })

      const upload = multer({ storage: storage }).single('file')
      
      return upload;
      

}

export default upploadFile;




