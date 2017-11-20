import { Router, Request, Response } from 'express';
import * as path from 'path';

const router = Router();

router.get('/', serveIndex);
router.get('/basket', serveIndex);
router.get('/pizza', serveIndex);
router.get('/calzone', serveIndex);
router.get('/pasta', serveIndex);
router.get('/sides', serveIndex);
router.get('/salads', serveIndex);
router.get('/drinks', serveIndex);
router.get('/desserts', serveIndex);
router.get('/ice-cream', serveIndex);
router.get('/delivery-areas', serveIndex);
router.get('/special-offers', serveIndex);
router.get('/about-us', serveIndex);
router.get('/terms-and-conditions', serveIndex);
router.get('/contact-us', serveIndex);
router.get('/checkout', serveIndex);
router.get('/order/success', serveIndex);
router.get('/order/failure', serveIndex);
router.get('/admin/orders', serveIndex);
router.get('/admin/customers', serveIndex);
router.get('/admin/reporting', serveIndex);
router.get('/admin/sign-in', serveIndex);

function serveIndex(_req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
}

export default router;
