// @flow
import NetworkClient from '../network/networkClient';

let server : any = null;
let client : NetworkClient | null = null;

class Socket {
	static getServer(): any {
		if(!server){
			server = new LOMSServer({});
		}

		return server;
	}

	static getClient(): NetworkClient {
		if(!client){
			client = new NetworkClient({});
		}

		return client;
	}
}

export default Socket;