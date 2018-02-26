import {consoleAlert, consoleWarning} from '../interface/devConsole';

const NATIVE_MODULE_MISSING = '**LOMS** Native Module is missing! NATIVE_MODULE_MISSING';

export class NativeModuleMissingError extends Error {
	constructor() {
		super(NATIVE_MODULE_MISSING);
		this.name = this.constructor.name;
		Error.captureStackTrace(this);
	}
}

const CONFIG_CRASHING = '**LOMS** Config json file is crashing! CONFIG_CRASHING';

export class ConfigCrashingError extends Error {
	constructor() {
		super(CONFIG_CRASHING);
		this.name = this.constructor.name;
		Error.captureStackTrace(this);
	}
}

export class DevConsole {
	constructor() {
		
		console.warn = (warn) => {
			consoleWarning(warn);
		};
		
		console.error = (error) => {
			if (typeof error === 'object') {
				const errorJson = this.destroyCircular(error);
				const errorTemplate = `error: ${errorJson.name} <br/>
				info: ${errorJson.message} <br/>
				stack: ${errorJson.stack.replace(/\n/gi, '<br/>')}`;
				consoleAlert(errorTemplate);
			}
			
			// People sometimes throw things besides Error objects, so…
			if (typeof error === 'function') {
				// JSON.stringify discards functions. We do too, unless a function is thrown directly.
				consoleAlert(`[Function: ${(error.name || 'anonymous')}]`);
			}
		};
		
		window.console = console;
		
		consoleWarning('DevConsole on');
	}
	
	destroyCircular(errorObject) {
		const jsonObject = Array.isArray(errorObject) ? [] : {};
		
		if (typeof errorObject.name === 'string') {
			jsonObject.name = errorObject.name;
		}
		
		if (typeof errorObject.message === 'string') {
			jsonObject.message = errorObject.message;
		}
		
		if (typeof errorObject.stack === 'string') {
			jsonObject.stack = errorObject.stack;
		}
		
		return jsonObject;
	}
}
