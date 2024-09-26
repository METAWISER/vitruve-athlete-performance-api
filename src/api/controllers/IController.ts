import { NextFunction, Request, Response } from "express";

export default interface Controller {
	run(req: Request, res: Response, next: NextFunction): Promise<void> | void;
}