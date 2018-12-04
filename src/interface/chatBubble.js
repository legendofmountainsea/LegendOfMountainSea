//@flow
import $ from 'jquery';

import T_alertNormalTemplate from '../static/interface/alert/alertNormal.html';

type ChatBubblePropsType ={
	content: string;
}

class ChatBubble {
	_content:string;

	constructor(props: ChatBubblePropsType) {
		this._content = props.content;
		this._init();
	}

	_init(){
		const alertContainer = document.createElement('div');
		$(alertContainer).addClass('row');

		$(alertContainer).html(T_alertNormalTemplate({content:this._content}));
		$(alertContainer).find('.alert').addClass('col-4 offset-md-1');

		$('#GUIContainer').append(alertContainer);

		setTimeout(()=>{
			$(alertContainer).fadeOut();

			setTimeout(()=>{
				$(alertContainer).remove();
			}, 1000);

		}, 5000);
	}
}

export default ChatBubble;