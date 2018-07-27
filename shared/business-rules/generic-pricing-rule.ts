import catalog from "../static-data/catalogue";
import { BasketItem } from "../dtos";

export default function(item: BasketItem) {
  let catalogItem = catalog.find(x => x.name === item.name);
  let price =
    typeof catalogItem.price === "number"
      ? catalogItem.price
      : catalogItem.price[item.version];
  return price;
}
