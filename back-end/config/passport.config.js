const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user.model');
const tokeConfig = require('./token.config');

module.exports = function(passport) {
    var options = {};
    options.jwtFromRequest = extractJwt.fromAuthHeader();
    options.secretOrKey = tokeConfig.secret;

    passport.use(new jwtStrategy(options, (jwtPayLoad, done) => {
        User.findOne({ id: jwtPayLoad.id }, (error, user) => {
            if (error) {
                return done(error)
            }
            if (user) {
                return done(null, user);
            }

            return done(null, false);
        });
    }));
}