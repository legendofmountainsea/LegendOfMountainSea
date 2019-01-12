//@flow
import {Client} from 'colyseus.js';
import ChatRoom from './room/chatRoom';

type NetworkClientPropsType = {
	ip: string;
	port: string;
	profile: Object;
}

class NetworkClient {
	_ip: string;
	_port: string;
	//_profile: Object;
	_client: any;
	_chatRoom: ChatRoom;

	constructor(props: NetworkClientPropsType){
		this._ip = props.ip || 'localhost';
		this._port = props.port || '1126';
		//this._profile = props.profile;
	}

	connect(){
		this._client = new Client(`ws://${this._ip}:${this._port}`);
		this._chatRoom = new ChatRoom({instance: this._client.join('chat')});
	}
}

export default NetworkClient;