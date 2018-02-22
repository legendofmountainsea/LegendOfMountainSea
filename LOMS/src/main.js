import LOMS from './app';
import {EXECUTE_WITHOUT_CLIENT} from './util/envUtil';
// import {oConsole} from './util/errorUtil';

EXECUTE_WITHOUT_CLIENT(()=>{
	const app = new LOMS;
	app.beginGame();
	// oConsole.enable();
	// oConsole.show();
});