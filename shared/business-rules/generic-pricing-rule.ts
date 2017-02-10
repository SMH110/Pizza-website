import catalog from '../static-data/catalogue';

export default function (item: BasketItem) {
    let catalogItem = catalog.find(x => x.name === item.name);
    let price = typeof catalogItem.price === 'number' ? catalogItem.price : catalogItem.price[item.version];
    return price;
}
