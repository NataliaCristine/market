import { Request, Response, NextFunction } from "express";
export declare const adminPermission: (req: Request, res: Response, next: NextFunction) => Promise<void>;
