const { body, validationResult } = require('express-validator');

const error = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }
    return res
        .status(400)
        .json({ result: false, message: errors.array()[0].msg });
};

const modifyValidation = [
    body('nickname')
        .trim()
        .notEmpty()
        .withMessage('닉네임은 반드시 입력해주셔야 합니다')
        .isLength({ min: 3 })
        .withMessage('닉네임은 최소 3글자 이상이어야 합니다')
        .isAlphanumeric('en-US', { ignore: '_' })
        .withMessage('닉네임은 영어/숫자만 가능합니다'),
    error,
];

module.exports = modifyValidation;
