import { Router } from 'express';
const router = Router();

import {errorHandler} from './router-utils';
import User from '../models/user.model';

router.get('/check', errorHandler(async (_req, res) => {
    res.send("OK");
}));

router.get('/database', errorHandler(async (_req, res) => {
    await User.find();
    res.send("OK");
}));

export default router;