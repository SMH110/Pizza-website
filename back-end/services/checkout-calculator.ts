import catalog from '../static-data/catalogue';
import { discountCalculator } from '../../shared/discount/discounts-calculator'
export function calculateOrderDetails(orderRequest: PlaceOrderRequest): CalculatedOrderDetails {
    let orderTotals: CalculatedOrderDetails = {
        total: 0,
        discount: 0,
        totalPayment: 0,
        orderLineItems: []
    };

    let allCatalogItems: Array<Pizza | Drink | Side> = [].concat(catalog.drinks).concat(catalog.pizzas).concat(catalog.sides);

    for (let item of orderRequest.orderItems) {
        let catalogItem = allCatalogItems.find(x => x.name === item.name);
        if (catalogItem === undefined) {
            throw new Error(`Item with name ${item.name} not found in the catalog`)
        }
        orderTotals.orderLineItems.push({
            name: item.name,
            version: item.version || null,
            price: typeof catalogItem.price === 'number' ? catalogItem.price : catalogItem.price[item.version],
            quantity: item.quantity,
            imageName: catalogItem.imageName,
            description: (catalogItem as Pizza).description || null
        });
    }

    let total = orderTotals.orderLineItems.reduce((total, item) => total += item.price * item.quantity, 0);
    orderTotals.total = Math.round(total * 100) / 100;
    orderTotals.totalPayment = orderTotals.total;
    orderTotals.discount = discountCalculator(orderTotals.orderLineItems)
    // TODO: Calculate discount etc

    return orderTotals;
}

interface CalculatedOrderDetails {
    total: number;
    discount: number;
    totalPayment: number;
    orderLineItems: OrderLineItem[];
}