import { expect } from 'chai';
import * as rp from 'request-promise';
import catalogue from '../../back-end/static-data/catalogue';

describe('Fetch items', function () {
    this.timeout(20000);

    it('Should fetch the pizzas as expected', async () => {
        let json = await rp.get('http://localhost:3000/api/items/pizzas', { json: true });
        expect(json).to.deep.equal(catalogue.filter(x => x.tags.indexOf('pizza') !== -1));
    });

    it('Should fetch the drinks as expected', async () => {
        let json = await rp.get('http://localhost:3000/api/items/drinks', { json: true });
        expect(json).to.deep.equal(catalogue.filter(x => x.tags.indexOf('drink') !== -1));
    });

    it('Should fetch the sides as expected', async () => {
        let json = await rp.get('http://localhost:3000/api/items/sides', { json: true });
        expect(json).to.deep.equal(catalogue.filter(x => x.tags.indexOf('side') !== -1));
    });
});
