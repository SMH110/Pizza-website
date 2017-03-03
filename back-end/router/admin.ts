import { Router } from 'express';
import * as jwt from 'jsonwebtoken';

import { errorHandler, IRequest, IResponse } from './router-utils';
import { JwtPayload } from "../config/passport.config";

const router = Router();

router.post('/sign-in', errorHandler(async (req: IRequest<AuthRequest>, res: IResponse<AuthResponse>) => {
    if (req.body.username !== process.env.ADMIN_USERNAME) {
        console.log(`Username ${req.body.username} incorrect. Attempt from IP Address: ${req.ip}.`);
        return res.sendStatus(401);
    }
    if (req.body.password !== process.env.ADMIN_PASSWORD) {
        console.log(`Password ${req.body.password} incorrect. Attempt from IP Address: ${req.ip}.`);
        return res.sendStatus(401);
    }
    let token = jwt.sign({ username: req.body.username } as JwtPayload, process.env.PASSPORT_SECRET, { expiresIn: '30m' });
    res.json({ token: `JWT ${token}` });
}));

export default router;
