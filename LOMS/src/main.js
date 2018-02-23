import LOMS from './app';
import {EXECUTE_WITHOUT_CLIENT} from './util/envUtil';

EXECUTE_WITHOUT_CLIENT(()=>{
	const app = new LOMS;
	app.beginGame();
});