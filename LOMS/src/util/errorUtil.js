export const NATIVE_MODULE_MISSING = 'Native Module is missing! NATIVE_MODULE_MISSING';
export const CONFIG_CRASHING = 'Config json file is crashing! CONFIG_CRASHING';

export class NativeModuleMissingError extends Error{
	constructor () {
		super(NATIVE_MODULE_MISSING);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class ConfigCrashingError extends Error{
	constructor () {
		super(CONFIG_CRASHING);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}