import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const makeTypesafeMiddleware =
	<
		Locals extends Record<string, unknown>,
		ResBody,
		Schemas extends {
			[requestKey in keyof Request]?: z.Schema<Request[requestKey]>;
		},
	>(
		// The following decleration essentially states that the schemas can be of (and only of) any property of Request
		schemas: keyof Schemas extends keyof Request
			? z.ZodObject<Schemas>
			: z.ZodObject<{ [key in Exclude<keyof Schemas, keyof Request>]: never }>,
		callback: (
			// Provide the post-validation types to the middleware callback provided
			req: z.infer<z.ZodObject<Schemas>> & Omit<Request, keyof Schemas>,
			res: Response<ResBody, Locals>,
			next: NextFunction,
		) => void | Promise<void>,
	) =>
	async (req: Request, res: Response<ResBody, Locals>, next: NextFunction) => {
		const reqSchema = schemas.passthrough();
		const parsedReq = await reqSchema.safeParseAsync(req);
		if (parsedReq.success) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			void callback(parsedReq.data as any, res, next);
		} else {
			next(parsedReq.error);
		}
	};

export default makeTypesafeMiddleware;
