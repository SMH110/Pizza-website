import { Router } from 'express';
import * as jwt from 'jsonwebtoken';

import { SECRET } from '../config/passport.config';
import User from '../models/user.model';
import { errorHandler } from './router-utils';

const router = Router();

router.post('/sign-in', errorHandler(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user || !(user as any).validatePassword(req.body.password)) {
        return res.json({ success: false });
    }
    let token = jwt.sign(user, SECRET, { expiresIn: '30m' });
    res.json({ success: true, token: `JWT ${token}` });
}));

export default router;