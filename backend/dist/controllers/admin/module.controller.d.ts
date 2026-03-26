import type { Request, Response } from "express";
export declare const moduleController: {
    getAllByCourse(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    reorder(req: Request, res: Response): Promise<void>;
};
