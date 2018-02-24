import LOMS from './app';
import {EXECUTE_IN_CLIENT} from './util/envUtil';
import {DevConsole} from './util/errorUtil';

EXECUTE_IN_CLIENT(()=>{
	if (process.env.NODE_ENV !== 'production') {
		new DevConsole();
	}
	
	const app = new LOMS;
	app.beginGame();
});