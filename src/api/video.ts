import { Router } from 'express';
import { getVideos } from '../controllers/video';

const router = Router();

router.get('/', getVideos);

export default router;
