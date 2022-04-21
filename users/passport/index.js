const passport = require('passport');

const FacebookStrategy = require('./facebook.strategy');
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
passport.use('facebook', FacebookStrategy);

module.exports = passport;
