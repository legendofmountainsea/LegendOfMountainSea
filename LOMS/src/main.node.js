import LOMS from './app';
import {EXECUTE_IN_CLIENT} from './util/envUtil';
import {oConsole} from './util/errorUtil';

EXECUTE_IN_CLIENT(()=>{
	const app = new LOMS;
	app.beginGame();
	oConsole.enable();
	oConsole.show();
	// if you want refact, you can just invoke oConsole.disable() to disable it
	// and you can get the console markup from invoking console.log, console.warn and console.error
	// setInterval(() => {
	// 	console.warn('err')
	// }, 2000);
});