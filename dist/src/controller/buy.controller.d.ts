import { NextFunction, Request, Response } from "express";
export declare const createBuy: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllBuy: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getOneBy: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
