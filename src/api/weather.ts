import { Router } from 'express';
import { getWeatherReport } from '../controllers/weather';

const router = Router();

router.get('/', getWeatherReport);

export default router;
