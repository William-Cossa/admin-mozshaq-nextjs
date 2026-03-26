import type { Request, Response } from "express";
export declare const paymentController: {
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    review(req: Request, res: Response): Promise<void>;
    getStats(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
};
