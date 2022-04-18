const { body, validationResult } = require('express-validator');

const error = (req, res, next) => {
    const errors = validationResult(req);
    console.log('validateError : ', errors['errors']);
    if (errors.isEmpty()) {
        return next();
    }
    console.log(errors.array()[0].msg);
    return res.json({ result: 'fail', errorMessage: errors.array()[0].msg });
};

const postValidation = [
    body('content')
        .notEmpty()
        .withMessage('내용을 입력해주세요')
        .isLength({ max: 200 })
        .withMessage('내용은 200자 이상 작성할 수 없습니다.'),
    body('location')
        .isLength({ max: 100 })
        .withMessage('주소는 100자 이상 작성할 수 없습니다.'),
    error,
];

module.exports = postValidation;
