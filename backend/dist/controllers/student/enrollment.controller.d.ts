import type { Request, Response } from "express";
export declare const studentEnrollmentController: {
    /**
     * O aluno inscreve-se num curso.
     * O studentId é extraído do token para segurança.
     */
    enroll(req: Request, res: Response): Promise<void>;
    /**
     * Listar as inscrições do próprio aluno.
     */
    getMyEnrollments(req: Request, res: Response): Promise<void>;
};
