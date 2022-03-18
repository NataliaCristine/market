import { Request, Response, NextFunction } from "express";
export declare const productCreate: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const productListOne: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const productAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
