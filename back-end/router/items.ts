import { Router } from 'express';
const router = Router();

import catalog from '../static-data/catalogue';
import { errorHandler, IResponse } from './router-utils';

router.get('/pizzas', errorHandler(async (_req, res: IResponse<Item[]>) => {
    res.json(catalog.filter(x => x.tags.indexOf('pizza') !== -1));
}));

router.get('/sides', errorHandler(async (_req, res: IResponse<Item[]>) => {
    res.json(catalog.filter(x => x.tags.indexOf('side') !== -1));
}));

router.get('/drinks', errorHandler(async (_req, res: IResponse<Item[]>) => {
    res.json(catalog.filter(x => x.tags.indexOf('drink') !== -1));
}));

export default router;
