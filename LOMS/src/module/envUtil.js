import {warn} from "../helper/devHelper";

export function EXECUTE_IN_CLIENT(method) {
	if (typeof window !== 'undefined' && this === window) {
		warn('Some method is only able to run in client side, please open nwjs client to test it.');
	} else {
		method();
	}
}

export function EXECUTE_IN_CLIENT_WITH_RETURN(method) {
	if (typeof window !== 'undefined' && this === window) {
		warn('Some method is only able to run in client side, please open nwjs client to test it.');
	} else {
		return method();
	}
}