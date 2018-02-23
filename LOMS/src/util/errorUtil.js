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
				consoleAlert(JSON.stringify(this.destroyCircular(error, [])));
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
	
	destroyCircular(from, seen) {
		const to = Array.isArray(from) ? [] : {};
		
		seen.push(from);
		
		for (const key of Object.keys(from)) {
			const value = from[key];
			
			if (typeof value === 'function') {
				continue;
			}
			
			if (!value || typeof value !== 'object') {
				to[key] = value;
				continue;
			}
			
			if (seen.indexOf(from[key]) === -1) {
				to[key] = destroyCircular(from[key], seen.slice(0));
				continue;
			}
			
			to[key] = '[Circular]';
		}
		
		if (typeof from.name === 'string') {
			to.name = from.name;
		}
		
		if (typeof from.message === 'string') {
			to.message = from.message;
		}
		
		if (typeof from.stack === 'string') {
			to.stack = from.stack;
		}
		
		return to;
	}
}
