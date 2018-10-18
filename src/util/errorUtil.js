import {consoleAlert, consoleWarning} from '../interface/devConsole';

const NATIVE_MODULE_MISSING = '**LOMS** Native Module is missing! NATIVE_MODULE_MISSING';

export class NativeModuleMissingError extends Error {
	constructor() {
		super(NATIVE_MODULE_MISSING);
		this.name = this.constructor.name;
		Error.captureStackTrace(this);
	}
}

const SEED_MODULE_INIT_CRASHING = '**LOMS** Seed module init with error! SEED_MODULE_INIT_CRASHING';

export class SeedCrashingError extends Error {
	constructor() {
		super(SEED_MODULE_INIT_CRASHING);
		this.name = this.constructor.name;
		Error.captureStackTrace(this);
	}
}

const CHARACTER_DATA_CRASHING = '**LOMS** Character data is crashing! CHARACTER_DATA_CRASHING ID: ';

export class CharacterCrashingError extends Error {
	constructor(props) {
		super(CHARACTER_DATA_CRASHING + props.ID);
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

			if (nw) {
				console.warn = (warn) => {
					this.parseMessage(warn, consoleWarning);
				};

				console.error = (error) => {
					this.parseMessage(error, consoleAlert);
				};

				global.window.console = console;

				console.warn('DevConsole on');
			}

		} else {
			setTimeout(() => {
				this.waitForConsoleThenStart();
			}, 100);
		}
	}

	parseMessage(message, popupMessageCallback) {

		if (typeof message === 'object') {
			const messageJson = this.destroyCircular(message);

			const messageType = `Type: ${messageJson.name} <br/>`;
			const messageInfo = `info: ${messageJson.message} <br/>`;
			const messageDetail = `stack: ${messageJson.stack.replace(/\\n/gi, '<br/>')}`;

			const messageTemplate = messageType + messageInfo + messageDetail;

			popupMessageCallback(messageTemplate);
			return;
		}

		// People sometimes throw things besides Error objects, so…
		if (typeof message === 'function') {
			// JSON.stringify discards functions. We do too, unless a function is thrown directly.
			popupMessageCallback(`[Function: ${(message.name || 'anonymous')}]`);
			return;
		}

		popupMessageCallback(message);
	}

	destroyCircular(messageObject) {
		const jsonObject = Array.isArray(messageObject) ? [] : {};

		if (typeof messageObject.name === 'string') {
			jsonObject.name = messageObject.name;
		}

		if (typeof messageObject.message === 'string') {
			jsonObject.message = messageObject.message;
		}

		if (typeof messageObject.stack === 'string') {
			jsonObject.stack = messageObject.stack;
		}

		return jsonObject;
	}
}
