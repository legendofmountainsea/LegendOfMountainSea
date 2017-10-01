import LOMSServer from './src/lomsServer';

new LOMSServer({config:{ port: 1126 }});

console.log("loms server running...");