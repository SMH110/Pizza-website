import { expect } from 'chai';
import fetch from 'node-fetch';

describe('Fetch Sides from MongoDB', function () {
    this.timeout(10000)

    it('Should fetch the items as expected', () => {
        return fetch('http://localhost:3000/api/sides')
            .then(res => res.json())
            .then(json => {
                expect(json).to.deep.equal([{
                    _id: '5848cc83f36d287699c1e609',
                    name: 'Garlic bread',
                    price: 4.59,
                    imageName: '/images/sides/garlic-bread.jpg'
                },
                {
                    _id: '5848cd8ef36d287699c1e658',
                    name: 'Cheesy chips',
                    price: 5.59,
                    imageName: '/images/sides/cheesy-chips.jpg'
                },
                {
                    _id: '5848cde3f36d287699c1e660',
                    name: 'Spicy wings',
                    price: 9.89,
                    imageName: '/images/sides/spicy-wings.jpg'
                },
                {
                    _id: '5848ce3ef36d287699c1e66a',
                    name: 'Potato wedges',
                    price: 8.59,
                    imageName: '/images/sides/potato-wedges.jpg'
                }
                ]);
            });
    });
});