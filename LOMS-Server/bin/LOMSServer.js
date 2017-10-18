'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ws = require('ws');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LOMSServer = function () {
    function LOMSServer(props) {
        _classCallCheck(this, LOMSServer);

        this.props = props;
        this._isStart = false;
        this._webSocketServer = null;
    }

    _createClass(LOMSServer, [{
        key: 'isStart',
        value: function isStart() {
            return this._isStart;
        }
    }, {
        key: 'run',
        value: function run() {
            this._webSocketServer = new _ws.Server(this.props.config);

            this._webSocketServer.on('connection', function (webSocket) {

                webSocket.on('message', function (message) {
                    //console.log('received: %s', message);
                });

                webSocket.send('something');
            });

            this._isStart = true;
        }
    }, {
        key: 'stop',
        value: function stop() {
            this._isStart = false;
        }
    }]);

    return LOMSServer;
}();

exports.default = LOMSServer;
//# sourceMappingURL=lomsServer.js.map