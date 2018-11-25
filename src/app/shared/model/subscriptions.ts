export class Subscriptions {
  constructor(
    public $key: string,
    public email: string,
    public date: string) {

  }

  static fromJsonList(array): Subscriptions[] {
    return array.map(Subscriptions.fromJson);
  }

  static fromJson({$key, email, date}): Subscriptions {
    return new Subscriptions($key, email, date);
  }
}
