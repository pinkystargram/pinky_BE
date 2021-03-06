require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const passportConfig = require('./login.kakao/');

app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://haewonreacthomework2.s3-website.ap-northeast-2.amazonaws.com',
            'https://ggulduk2.shop',
            'http://ud.dicegame.react.s3-website.ap-northeast-2.amazonaws.com',
        ],
    })
);
// app.use(cors());
app.use(morgan('dev'));

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable('x-powered-by');
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

const Router = require('./routes');
app.use('/api', Router);

app.use((req, res, next) => {
    res.status(404).send('요청하신 페이지를 찾을 수 없습니다.');
});

app.use((err, req, res, next) => {
    res.json({ result: false, message: err.message });
});

module.exports = app;
