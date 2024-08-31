import { Request, Response, NextFunction } from 'express';
import { axiosNewsInstance } from '../utils/axiosInstance';
import { Article } from '../types';

const headlines = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await axiosNewsInstance.get('/top-headlines', {
            params: {
                country: 'in',
            },
        });

        const updatedRes = response.data.articles;
        res.json(updatedRes);
    } catch (error) {
        next(error);
    }
};

const getTodayNews = async (req: Request, res: Response, next: NextFunction) => {
    const count = req.query.count || 10;
    try {
        const response = await axiosNewsInstance.get('/top-headlines', {
            params: {
                country: 'in',
            },
        });

        let updatedRes = response.data.articles.filter((artical: Article) => !!artical.urlToImage);
        const resWithoutImg = response.data.articles.filter((artical: Article) => !artical.urlToImage);

        if (updatedRes.length < Number(count)) {
            updatedRes = [...updatedRes, ...resWithoutImg];
        }

        res.json(updatedRes.slice(0, Number(count)));
    } catch (error) {
        next(error);
    }
};

const newsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    const category: string = req.params.category.toLowerCase();
    const count = req.query.count;

    const countryMap: Record<string, string> = {
        asia: 'ae',
        europe: 'gb',
        america: 'us',
    };
    try {
        let response;
        if (['asia', 'europe', 'america'].includes(category)) {
            response = await axiosNewsInstance.get('/top-headlines', {
                params: {
                    country: countryMap[category],
                    pageSize: count,
                },
            });
        } else {
            response = await axiosNewsInstance.get('/top-headlines', {
                params: {
                    category,
                    pageSize: count,
                    language: 'en',
                },
            });
        }

        res.json(response.data.articles);
    } catch (error) {
        next(error);
    }
};

const newsBySources = async (req: Request, res: Response, next: NextFunction) => {
    const { sources = 'bbc-news', count = 10 } = req.query;
    try {
        const response = await axiosNewsInstance.get('/top-headlines', {
            params: {
                sources,
            },
        });

        let filteredRes = response.data.articles.filter((artical: Article) => !!artical.urlToImage);
        const withoutImg = response.data.articles.filter((artical: Article) => !artical.urlToImage);

        if (filteredRes.length < Number(count)) {
            filteredRes = [...filteredRes, ...withoutImg];
        }

        res.json(filteredRes.slice(0, Number(count)));
    } catch (error) {
        next(error);
    }
};

const newsSearch = async (req: Request, res: Response, next: NextFunction) => {
    const { q = '', count = 10 } = req.query;
    try {
        const response = await axiosNewsInstance.get('/everything', {
            params: {
                q,
                pageSize: count,
                sortBy: 'publishedAt',
                language: 'en',
            },
        });

        res.json(response.data.articles);
    } catch (error) {
        next(error);
    }
};

export { headlines, newsByCategory, newsBySources, getTodayNews, newsSearch };
