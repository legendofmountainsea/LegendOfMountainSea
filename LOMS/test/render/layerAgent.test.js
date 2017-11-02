import expect from 'expect.js';
import LayerAgent from '../../src/render/layerAgent';

describe('LayerAgent', () => {
    let layerAgent;

    beforeEach(() => {
        layerAgent = new LayerAgent({stage:null});
    });

    afterEach(() => {
        layerAgent = null;
    });

    it('should be not out', ()=>{

        const actor = {id:'a'},
            index = 2,
            actorB = {id: 'b'},
            indexB = 1;

        layerAgent._addToLayer(actor, index);
        layerAgent._addToLayer(actorB, indexB);

        let resultA = layerAgent._getTopElementInLayer(index),
            resultB = layerAgent._getTopElementInLayer(indexB);

        expect(resultA).to.eql(actor);

        expect(resultB).to.eql(actorB);
    });

})
;
