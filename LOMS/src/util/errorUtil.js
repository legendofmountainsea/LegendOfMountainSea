const NATIVE_MODULE_MISSING = '**LOMS** Native Module is missing! NATIVE_MODULE_MISSING';

export class NativeModuleMissingError extends Error{
	constructor () {
		super(NATIVE_MODULE_MISSING);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

const CONFIG_CRASHING = '**LOMS** Config json file is crashing! CONFIG_CRASHING';
export class ConfigCrashingError extends Error{
	constructor () {
		super(CONFIG_CRASHING);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}