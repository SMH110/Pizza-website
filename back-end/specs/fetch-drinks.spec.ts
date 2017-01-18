import { expect } from 'chai';
import fetch from 'node-fetch';

describe('Fetch Drinks from MongoDB', function () {
    this.timeout(20000);
    
    it('Should fetch the items as expected', () => {
        return fetch('http://localhost:3000/api/drinks')
            .then(res => res.json())
            .then(json => {
                expect(json).to.deep.equal([{
                    _id: '5848d652f36d287699c1e79a',
                    name: 'Coca Cola Diet Coke 1.75L',
                    price: 1.66,
                    imageName: '/images/drinks/coca-cola-diet-doke-1.75L.jpg'
                },
                {
                    _id: '5848d9f0f36d287699c1e7f0',
                    name: 'Pepsi Max 330ml',
                    price: 0.33,
                    imageName: '/images/drinks/pepsi-max-can.jpg'
                },
                {
                    _id: '5848da53f36d287699c1e830',
                    name: 'Fanta 330ml',
                    price: 0.35,
                    imageName: '/images/drinks/fanta-330.jpg'
                },
                {
                    _id: '5848d74cf36d287699c1e7af',
                    name: 'Pepsi Max 1.75L',
                    price: 1.77,
                    imageName: '/images/drinks/pepsi-max-1.75L.jpg'
                },
                {
                    _id: '5848d8a0f36d287699c1e7ca',
                    name: '7 Up Lemon And Lime 2 Litre Bottle',
                    price: 1,
                    imageName: '/images/drinks/7up-2l.jpg'
                },
                {
                    _id: '5848d7f9f36d287699c1e7c0',
                    name: 'Fanta Orange 2 Litre Bottle',
                    price: 1.85,
                    imageName: '/images/drinks/fanta-2-l.jpg'
                }
                ]);
            });
    });
});