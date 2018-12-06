import { Sneaker } from './sneaker';

export class Order {
  constructor(
    public $key: string,
    public status: number,
    public date: string,
    public total: number,
    public paymentMethod: number,
    public shipping: number,
    ) {

  }

  static fromJsonList(array): Order[] {
    return array.map(Order.fromJson);
  }

  static fromJson({$key, status, date, total, paymentMethod, shipping}): Order {
    return new Order($key, status, date, total, paymentMethod, shipping);
  }
}


export class CartPerUser {
  constructor(
    public $key: string,
    public sizes: string,
    public quantity: number,
    public sneaker?: Sneaker,
    ) {

  }

  static fromJson({$key, sizes, quantity}): CartPerUser {
    return new CartPerUser($key, sizes, quantity);
  }
}


export class SneakersPerOrder {
  constructor(
    public $key: string,
    public sizes: string,
    public quantity: number,
    public sneaker?: Sneaker,
    ) {

  }

  static fromJson({$key, sizes, quantity}): SneakersPerOrder {
    return new CartPerUser($key, sizes, quantity);
  }
}

export enum PaymentMethod {
  Card = 0,
  Paypal = 1,
}

export enum Status {
  Confirmed = 0,
  InProgress = 1,
  Delivered = 2,
  Finished = 3,
}
