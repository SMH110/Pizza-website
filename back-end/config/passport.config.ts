import { Strategy, ExtractJwt } from 'passport-jwt';
import * as passport from 'passport';

var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.PASSPORT_SECRET
};

passport.use(new Strategy(options, async (jwtPayLoad: JwtPayload, done) => {
    if (jwtPayLoad.username === process.env.ADMIN_USERNAME) {
        done(null, true);
    } else {
        done(null, false);
    }
}));

export interface JwtPayload {
    username: string;
}
