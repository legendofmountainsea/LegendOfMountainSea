declare var PIXI: any;
declare var Audio: any;
declare var LOMSServer: any;
declare module 'pixi.js' {
	declare export default any;
	declare export var Loader: any;
	declare export var Rectangle: any;
	declare export var Circle: any;
	declare export var AnimatedSprite: any;
	declare export var Sprite: any;
	declare export var Container: any;
	declare export var Application: any;
}

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