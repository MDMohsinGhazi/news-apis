import { Request, Response, NextFunction } from 'express';
import { axiosVideoInstance } from '../utils/axiosInstance';

const getVideos = async (req: Request, res: Response, next: NextFunction) => {
    const count = req.query.count || 10;
    try {
        const response = await axiosVideoInstance.get('', {
            params: {
                q: 'news',
                per_page: count,
            },
        });

        const updatedRes = response.data.hits;
        res.json(updatedRes);
    } catch (error) {
        next(error);
    }
};

export { getVideos };
