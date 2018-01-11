import {NativeModuleMissError} from './errorUtil';

export function EXECUTE_IN_CLIENT(method) {
	if (typeof window !== 'undefined' && typeof nw === 'undefined') {
		console.warn('Some feature is not showing in web mode.');
	} else {
		method();
	}
}

export function EXECUTE_IN_CLIENT_WITH_RETURN(method) {
	if (typeof window !== 'undefined' && typeof nw === 'undefined') {
		throw new NativeModuleMissError();
	} else {
		return method();
	}
}