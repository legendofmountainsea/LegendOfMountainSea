import expect from 'expect.js';
import LOMSServer from '../src/LOMSServer';

describe("LOMSServer", function () {
    let lomsServer;

    beforeEach(function () {
        lomsServer = new LOMSServer({config:{ port: 1126 }});
    });

    it("should be able to start", function () {
        expect(lomsServer.isStart()).to.not.be.ok();
        lomsServer.run();
        expect(lomsServer.isStart()).to.be.ok();
    });

});
