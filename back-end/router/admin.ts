import { Router } from 'express';
import * as jwt from 'jsonwebtoken';

import User, { validatePassword } from '../models/user.model';
import { errorHandler, IRequest, IResponse } from './router-utils';

const router = Router();

router.post('/sign-in', errorHandler(async (req: IRequest<AuthRequest>, res: IResponse<AuthResponse>) => {
    let email = req.body.email;
    let user = await User.findOne({ email: email });
    if (!user) {
        console.log(`User with email ${req.body.email} not found. Attempt from IP Address: ${req.ip}.`);
        return res.sendStatus(401);
    }
    if (!validatePassword(user, req.body.password)) {
        console.log(`Incorrect password for user ${req.body.email}. Attempt from IP Address: ${req.ip}.`);
        return res.sendStatus(401);
    }
    // TODO: Refactor this out into a passport module
    let token = jwt.sign(user, process.env.PASSPORT_SECRET, { expiresIn: '30m' });
    res.json({ token: `JWT ${token}` });
}));

export default router;