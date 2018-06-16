import {consoleAlert, consoleWarning} from '../interface/devConsole';
import {EXECUTE_IN_CLIENT} from './envUtil';

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
		this.waitForConsoleThenStart();
	}

	waitForConsoleThenStart() {
		if (typeof global.window !== 'undefined') {

			EXECUTE_IN_CLIENT(() => {
				console.warn = (warn) => {

					if (typeof error === 'object') {
						const warnJson = this.destroyCircular(warn);
						const warnTemplate = `error: ${warnJson.name} <br/>
				info: ${warnJson.message} <br/>
				stack: ${warnJson.stack.replace(/\n/gi, '<br/>')}`;
						consoleWarning(warnTemplate);
						return;
					}

					// People sometimes throw things besides Error objects, so…
					if (typeof error === 'function') {
						// JSON.stringify discards functions. We do too, unless a function is thrown directly.
						consoleWarning(`[Function: ${(warn.name || 'anonymous')}]`);
						return;
					}

					consoleWarning(warn);
				};

				console.error = (error) => {

					if (typeof error === 'object') {
						const errorJson = this.destroyCircular(error);
						const errorTemplate = `error: ${errorJson.name} <br/>
				info: ${errorJson.message} <br/>
				stack: ${errorJson.stack.replace(/\n/gi, '<br/>')}`;
						consoleAlert(errorTemplate);
						return;
					}

					// People sometimes throw things besides Error objects, so…
					if (typeof error === 'function') {
						// JSON.stringify discards functions. We do too, unless a function is thrown directly.
						consoleAlert(`[Function: ${(error.name || 'anonymous')}]`);
						return;
					}

					consoleAlert(error);
				};

				global.window.console = console;

				console.warn('DevConsole on');
			});

		} else {
			setTimeout(() => {
				this.waitForConsoleThenStart();
			}, 100);
		}
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
