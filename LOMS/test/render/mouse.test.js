import expect from 'expect.js';
import Mouse from '../../src/render/mouse';

describe("Mouse", () => {
	const width = 50,
		height = 60;
	let mouse;
	
	beforeEach(() => {
		let hitArea = { width, height};
		mouse = new Mouse({hitArea:hitArea});
	});
	
	afterEach(() => {
		mouse = null;
	});
	
	it("status should be up", () => {
		mouse._checkPosition({x:9,y:5,width:9,height:5});
		
		expect(mouse._status).to.be(mouse.STATUS_UP);
		
		mouse._checkPosition({x:9,y:8,width:9,height:8});
		
		expect(mouse._status).to.be(mouse.STATUS_UP);
	});
	
	it("status should be inside", () => {
		mouse._checkPosition({x:9,y:9,width:9,height:9});
		
		expect(mouse._status).to.be(mouse.STATUS_INSIDE);
		
		mouse._checkPosition({x:40,y:40,width:40,height:40});
		
		expect(mouse._status).to.be(mouse.STATUS_INSIDE);
	});
	
	it("status should be down", () => {
		mouse._checkPosition({x:9,y:60,width:9,height:60});
		
		expect(mouse._status).to.be(mouse.STATUS_DOWN);
		
		mouse._checkPosition({x:40,y:61,width:40,height:61});
		
		expect(mouse._status).to.be(mouse.STATUS_DOWN);
	});
	
	it("status should be left", () => {
		mouse._checkPosition({x:8,y:50,width:8,height:50});
		
		expect(mouse._status).to.be(mouse.STATUS_LEFT);
		
		mouse._checkPosition({x:1,y:50,width:1,height:50});
		
		expect(mouse._status).to.be(mouse.STATUS_LEFT);
	});
	
	it("status should be right", () => {
		mouse._checkPosition({x:50,y:50,width:50,height:50});
		
		expect(mouse._status).to.be(mouse.STATUS_RIGHT);
		
		mouse._checkPosition({x:51,y:50,width:51,height:50});
		
		expect(mouse._status).to.be(mouse.STATUS_RIGHT);
	});
	
});
