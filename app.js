require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://haewonreactweek3.s3-website.ap-northeast-2.amazonaws.com/',
        ],
        credentials: true,
    })
);
app.use(morgan('dev'));

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable('x-powered-by');

const Router = require('./routes');
app.use('/api', Router);

app.use((req, res, next) => {
    res.status(404).send('요청하신 페이지를 찾을 수 없습니다.');
});

module.exports = app;
