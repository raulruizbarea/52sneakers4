export class User {
  constructor(
    public $key: string,
    public name: string,
    public surnames: string,
    public email: string,
    public notifications: boolean,
    public phone?: string,
    public address?: string,
    public postalCode?: string,
    public city?: string,
    public country?: string,
    public urlImage?: string,
    ) {

  }

  static fromJsonList(array): User[] {
    return array.map(User.fromJson);
  }

  static fromJson({$key, name, surnames, email, notifications, phone, address, postalCode, city, country, urlImage}): User {
    return new User($key, name, surnames, email, notifications, phone, address, postalCode, city, country, urlImage);
  }
}
