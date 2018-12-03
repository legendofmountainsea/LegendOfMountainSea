declare var PIXI: any;
declare module 'jquery' {
	declare export default any;
}
declare module 'bootstrap' {
	declare export default any;
}
declare module 'loms.perlin' {
	declare export default any;
}

declare module 'loms.uuid' {
	declare export function uuid(): string;
	declare export default any;
}

declare module 'colyseus.js' {
	declare export class Client {
		constructor(...args:any): Client;
		join(...args:any): any;
	}
	declare export default any;
}