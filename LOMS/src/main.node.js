import LOMS from './app';
import {EXECUTE_IN_CLIENT} from './util/envUtil';

EXECUTE_IN_CLIENT(()=>{
	const app = new LOMS;
	app.beginGame();
});