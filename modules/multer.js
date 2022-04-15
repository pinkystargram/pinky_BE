const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_S3_ID,
    secretAccessKey: process.env.AWS_S3_SECRET,
    region: 'ap-northeast-2',
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, Date.now() + '.' + file.originalname.split('.').pop());
        },
    }),
    limits: { fileSize: 3 * 1024 * 1024 },
});

module.exports = upload;
