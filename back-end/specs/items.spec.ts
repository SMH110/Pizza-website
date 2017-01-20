import { expect } from 'chai';
import fetch from 'node-fetch';
import catalogue from '../static-data/catalogue';

describe('Fetch items', function () {
    this.timeout(20000);

    it('Should fetch the pizzas as expected', async () => {
        let json = await (await fetch('http://localhost:3000/api/items/pizzas')).json();
        expect(json).to.deep.equal(catalogue.pizzas);
    });

    it('Should fetch the drinks as expected', async () => {
        let json = await (await fetch('http://localhost:3000/api/items/drinks')).json();
        expect(json).to.deep.equal(catalogue.drinks);
    });

    it('Should fetch the sides as expected', async () => {
        let json = await (await fetch('http://localhost:3000/api/items/sides')).json();
        expect(json).to.deep.equal(catalogue.sides);
    });
});