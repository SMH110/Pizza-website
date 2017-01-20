import { Router } from 'express';
const router = Router();

import catalog from '../static-data/catalogue';
import { errorHandler, IResponse } from './router-utils';

router.get('/pizzas', errorHandler(async (_req, res: IResponse<Pizza[]>) => {
    res.json(catalog.pizzas);
}));

router.get('/sides', errorHandler(async (_req, res: IResponse<Side[]>) => {
    res.json(catalog.sides);
}));

router.get('/drinks', errorHandler(async (_req, res: IResponse<Drink[]>) => {
    res.json(catalog.drinks);
}));

export default router;