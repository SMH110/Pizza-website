import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import { SECRET } from '../config/passport.config';
import User from '../models/user.model';

const router = express.Router();

router.post('/sign-in', (req, res) => {

    User.findOne({ email: req.body.email }, (error, user) => {
        if (error) {
            res.json({ success: false, message: "Some Error" });
            return console.error(error)
        }
        if (!user || !(user as any).validatePassword(req.body.password)) {
            res.json({
                success: false,
                message: "Wrong email or password!"
            });

            return;
        }
        let token = jwt.sign(user, SECRET, {
            expiresIn: 1000 * 60
        })
        res.json({ success: true, token: `JWT ${token}` });
    });
});

export default router;