import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.model';
import * as passport from 'passport';

// TODO: Move this into an environment variable
export const SECRET = "4890#%#$^5755zvjopd%^wQ@#$)&*dfm;bfoxigj";

var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: SECRET
};

passport.use(new Strategy(options, (jwtPayLoad, done) => {
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