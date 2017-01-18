import { Router } from 'express';
const router = Router();

import pizzas from '../models/pizzas.model';
import sides from '../models/sides.model';
import drinks from '../models/drinks.model';
import { asyncHandler } from './router-utils';

router.get('/pizzas', asyncHandler(async (_req, res) => {
    res.json(await pizzas.find());
}));

router.get('/sides', asyncHandler(async (_req, res) => {
    res.json(await sides.find());
}));

router.get('/drinks', asyncHandler(async (_req, res) => {
    res.json(await drinks.find());
}));

export default router;