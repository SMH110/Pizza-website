import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', serveIndex);
router.get('/basket', serveIndex);
router.get('/pizza', serveIndex);
router.get('/sides', serveIndex);
router.get('/drinks', serveIndex);
router.get('/about-us', serveIndex);
router.get('/terms-and-conditions', serveIndex);
router.get('/contact-us', serveIndex);
router.get('/checkout', serveIndex);
router.get('/order/success', serveIndex);
router.get('/order/failure', serveIndex);
router.get('/admin/get-orders', serveIndex);
router.get('/admin/sign-in', serveIndex);

function serveIndex(_req: Request, res: Response) {
    res.render('index.html');
}

export default router;