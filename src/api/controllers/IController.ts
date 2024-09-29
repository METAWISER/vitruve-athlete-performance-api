import { Context } from "hono";

export default interface Controller {
	run(c: Context): Promise<Response> | void;
}