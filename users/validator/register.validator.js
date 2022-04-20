const { body, validationResult } = require('express-validator');

const error = (req, res, next) => {
    const errors = validationResult(req);
    console.log('validateError : ', errors['errors']);
    if (errors.isEmpty()) {
        return next();
    }
    console.log(errors.array()[0].msg);
    return res
        .status(401)
        .json({ result: false, message: errors.array()[0].msg });
};

const registerValidation = [
    body('email')
        .trim()
        .isLength({ min: 5 })
        .withMessage('아이디는 최소 5글자 이상이어야 합니다')
        .isEmail()
        .withMessage('아이디는 이메일 형식이어야 합니다'),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('비밀번호는 최소 5글자 이상이어야 합니다')
        .isAlphanumeric()
        .withMessage('비밀번호는 영문자와 숫자만 사용가능합니다'),
    body('nickname')
        .trim()
        .isLength({ min: 3 })
        .withMessage('닉네임은 최소 3글자 이상이어야 합니다')
        .isAlphanumeric('en-US', { ignore: '_' })
        .withMessage('닉네임은 영어/숫자만 가능합니다'),
    error,
];

module.exports = registerValidation;
