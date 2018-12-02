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
