import { Sneaker } from './sneaker';

export class Order {
  constructor(
    public $key: string,
    public status: number,
    ) {

  }

  static fromJsonList(array): Order[] {
    return array.map(Order.fromJson);
  }

  static fromJson({$key, status}): Order {
    return new Order($key, status);
  }
}


export class CartPerUser {
  constructor(
    public $key: string,
    public size: string,
    public quantity: number,
    public sneaker?: Sneaker,
    ) {

  }

  static fromJson({$key, size, quantity}): CartPerUser {
    return new CartPerUser($key, size, quantity);
  }
}
