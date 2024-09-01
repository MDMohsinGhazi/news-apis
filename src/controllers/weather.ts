import { Request, Response, NextFunction } from 'express';
import { axiosWeatherInstance } from '../utils/axiosInstance';

const getWeatherReport = async (req: Request, res: Response, next: NextFunction) => {
    const latitude = req.params.latitude ?? 13.0712591;
    const longitude = req.params.longitude ?? 77.6421465;
    try {
        const response = await axiosWeatherInstance.get('/', {
            params: {
                lat: latitude,
                lon: longitude,
            },
        });

        const updatedRes = response.data;
        res.json(updatedRes);
    } catch (error) {
        next(error);
    }
};

export { getWeatherReport };
