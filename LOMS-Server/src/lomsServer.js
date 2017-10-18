import {Server} from 'ws';

export default class LOMSServer {
    constructor(props){
        this.props = props;
        this._isStart = false;
        this._webSocketServer = null;
    }

    isStart(){
        return this._isStart;
    }

    run(){
        this._webSocketServer = new Server(this.props.config);

        this._webSocketServer.on('connection', (webSocket) => {

            webSocket.on('message', (message) => {
                //console.log('received: %s', message);
            });

            webSocket.send('something');
        });

        this._isStart = true;
    }

    stop(){
        this._isStart = false;
    }
}

