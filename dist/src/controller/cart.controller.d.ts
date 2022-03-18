import { Request, Response, NextFunction } from "express";
export declare const productCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const cartOne: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const allCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const cartProductDelete: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
