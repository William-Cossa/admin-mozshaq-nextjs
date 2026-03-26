import type { Request, Response } from "express";
export declare const coursePublicController: {
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
};
