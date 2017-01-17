import { Router, Request, Response } from 'express';
const router = Router();

import pizzas from '../models/pizzas.model';
import sides from '../models/sides.model';
import drinks from '../models/drinks.model';

router.get('/pizzas', (_req: Request, res: Response) => {
    pizzas.find((error, pizzas) => {
        if (error) {
            console.error(error);
            return res.sendStatus(500);
        }
        res.json(pizzas);
    });
});

router.get('/sides', (_req: Request, res: Response) => {
    sides.find((error, sides) => {
        if (error) {
            console.error(error);
            return res.sendStatus(500);
        }
        res.json(sides);
    });
});

router.get('/drinks', (_req: Request, res: Response) => {
    drinks.find((error, drinks) => {
        if (error) {
            console.error(error);
            return res.sendStatus(500);
        }
        res.json(drinks);
    });
});

export default router;