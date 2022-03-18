import { Request, Response, NextFunction } from "express";
export declare const create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const list_one_user: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const get_all_admin: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const recupPass: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateSenha: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
