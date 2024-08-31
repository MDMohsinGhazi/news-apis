import { Router } from 'express';
import { getTodayNews, headlines, newsByCategory, newsBySources, newsSearch } from '../controllers/news';

const router = Router();

router.get('/headlines', headlines);
router.get('/today', getTodayNews);
router.get('/category/:category', newsByCategory);
router.get('/sources', newsBySources);
router.get('/search', newsSearch);

export default router;
