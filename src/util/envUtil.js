import {NativeModuleMissingError} from './errorUtil';

export function IS_WITHOUT_CLIENT() {
	return (typeof nw === 'undefined');
}

export function EXECUTE_IN_CLIENT(method) {
	if (IS_WITHOUT_CLIENT()) {
		console.warn('**LOMS** Some feature is only enabled in client, use `loms run-client` to test it.');
	} else {
		method();
	}
}

export function EXECUTE_WITHOUT_CLIENT(method) {
	if (!IS_WITHOUT_CLIENT()) {
		return;
	}
	method();
}

export function EXECUTE_IN_CLIENT_WITH_RETURN(method) {
	if (IS_WITHOUT_CLIENT()) {
		throw new NativeModuleMissingError();
	} else {
		return method();
	}
}