const fileSystem = require('fs');
const pathHelper = require('path');
const qinjs = require('qin.js');
const serverjs = require('loms.server').default;

const lomsServer = new serverjs({});
lomsServer.start();