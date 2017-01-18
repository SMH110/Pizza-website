import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.model';
import * as passport from 'passport';

// TODO: Move this into an environment variable
export const SECRET = "4890#%#$^5755zvjopd%^wQ@#$)&*dfm;bfoxigj";

var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: SECRET
};

passport.use(new Strategy(options, async (jwtPayLoad, done) => {
    try {
        let user = await User.findOne({ id: jwtPayLoad.id });
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error);
    }
}));