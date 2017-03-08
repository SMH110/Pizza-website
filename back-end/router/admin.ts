import { Router } from 'express';
import * as session from 'express-session';
import Order from '../models/orders.model';
import { errorHandler, IRequest, IResponse } from './router-utils';

const router = Router();

// Session
const MINUTE = 60 * 1000;
router.use(session({ secret: process.env.PASSPORT_SECRET, resave: false, saveUninitialized: false, cookie: { maxAge: 30 * MINUTE }, rolling: true }));

router.post('/sign-in', errorHandler(async (req: IRequest<AuthRequest>, res) => {
    if (req.body.username !== process.env.ADMIN_USERNAME) {
        console.log(`Username ${req.body.username} incorrect. Attempt from IP Address: ${req.ip}.`);
        return res.sendStatus(401);
    }
    if (req.body.password !== process.env.ADMIN_PASSWORD) {
        console.log(`Password ${req.body.password} incorrect. Attempt from IP Address: ${req.ip}.`);
        return res.sendStatus(401);
    }
    req.session["isAuthenticated"] = true;
    return res.sendStatus(200);
}));

router.get('/get-orders', ensureLoggedIn, errorHandler(async (_req, res: IResponse<Order[]>) => {
    res.json(await Order.find());
}));

router.post('/mark-as-complete', ensureLoggedIn, errorHandler(async (req: IRequest<MarkAsCompleteRequest>, res) => {
    await Order.update({ _id: req.body.orderId }, { status: "Complete" });
    res.send();
}));

router.get('/sign-out', errorHandler(async (req, res) => {
    req.session.destroy(error => {
        console.error('Error destroying session');
        console.error(error);
    });
    res.sendStatus(200);
}));

export default router;

function ensureLoggedIn(req: IRequest<void>, res: IResponse<void>, next: (err?: any) => void) {
    if (req.session["isAuthenticated"]) {
        next();
    } else {
        res.sendStatus(401);
    }
}
