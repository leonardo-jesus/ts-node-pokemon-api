import { Request, Response } from 'express';

export const healthcheckController = (_req: Request, res: Response) => {
    try {
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json(error);
    }
};
