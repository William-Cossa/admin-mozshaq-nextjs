import type { CreatePaymentInput, ReviewPaymentInput } from "../../validators/admin/payment.validator.js";
export declare const paymentService: {
    getAll(query?: any): Promise<{
        total: number;
        page: number;
        limit: number;
        data: any[];
    }>;
    getById(id: string): Promise<any>;
    getStats(): Promise<{
        receitaTotal: number;
        pendentes: number;
        receitaMesActual: number;
    }>;
    create(data: CreatePaymentInput): Promise<any>;
    review(id: string, data: ReviewPaymentInput): Promise<any>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
};
