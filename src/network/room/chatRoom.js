//@flow
import ChatBubble from '../../interface/chatBubble';

type ChatRoomPropsType = {
	instance: any;
}

class ChatRoom {
	_state: Object;
	_instance: any;
	constructor(props: ChatRoomPropsType){
		this._state = {};
		this._instance = props.instance;
		this._init();
	}

	_init(){
		// this._instance.onJoin.add(()=>{
		// 	//console.log(`${ this._instance.sessionId } joined!`);
		// });
		//
		this._instance.onStateChange.add((state)=>{
			this._state = state;
			//console.log("new state:", state);
		});

		this._instance.listen('messages/:index', (change) => {
			new ChatBubble({content: change.value});
		});
	}
}

export default ChatRoom;