const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/images'), function (err, succ) {
            if (err) {
                console.log(err);
            }
        });
    },
    filename: function (req, file, cb) {
        const fileName = file.fieldname + '_' + Date.now() + '_' + file.originalname;
        cb(null, fileName, function (err, succ) {
            if (err) {
                console.log(err);
            }
        });
    }
})

const upload = multer({
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'), false);
        }
    },
    storage: storage
}).single('image');

module.exports = upload;