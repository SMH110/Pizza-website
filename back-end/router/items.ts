import { Router } from 'express';
const router = Router();

import pizzas from '../models/pizzas.model';
import sides from '../models/sides.model';
import drinks from '../models/drinks.model';
import { errorHandler } from './router-utils';

router.get('/pizzas', errorHandler(async (_req, res) => {
    res.json(await pizzas.find());
}));

router.get('/sides', errorHandler(async (_req, res) => {
    res.json(await sides.find());
}));

router.get('/drinks', errorHandler(async (_req, res) => {
    res.json(await drinks.find());
}));

export default router;