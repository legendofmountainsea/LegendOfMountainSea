import {NativeModuleMissingError} from './errorUtil';

export function EXECUTE_IN_CLIENT(method) {
	if (typeof nw === 'undefined') {
		console.warn('Some feature is not showing in web mode.');
	} else {
		method();
	}
}

export function EXECUTE_WITHOUT_CLIENT(method) {
	if (typeof nw !== 'undefined') {
		return;
	}
	method();
}

export function EXECUTE_IN_CLIENT_WITH_RETURN(method) {
	if (typeof nw === 'undefined') {
		throw new NativeModuleMissingError();
	} else {
		return method();
	}
}