export const NATIVE_MODULE_MISSING = 'Native Module is missing! NATIVE_MODULE_MISSING';

export class NativeModuleMissError extends Error{
	constructor () {
		super(NATIVE_MODULE_MISSING);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}