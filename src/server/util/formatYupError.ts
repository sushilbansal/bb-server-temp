import { ValidationError } from "yup";

export const formatYupError = (err: ValidationError) => {
	
	const customErrors: Array<{ path: string, message: string }> = [];
	
	err.inner.forEach(e => {
		customErrors.push({
			path: e.path,
			message: e.message,
		});
	});
	return customErrors;
}