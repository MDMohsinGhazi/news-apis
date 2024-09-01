import { Router } from 'express';

const router = Router();

// import Router files
import newsRoutes from './news';
import weatherRoutes from './weather';
import quotesRoutes from './quotes';
import videoRoutes from './video';

router.use('/news', newsRoutes);
router.use('/weather', weatherRoutes);
router.use('/quotes', quotesRoutes);
router.use('/videos', videoRoutes);

export default router;
