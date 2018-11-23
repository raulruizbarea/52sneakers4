export class User {
  constructor(
    public $key: string,
    public name: string,
    public surnames: string,
    public email: string) {

  }

  static fromJsonList(array): User[] {
    return array.map(User.fromJson);
  }

  static fromJson({$key, name, surnames, email}): User {
    return new User($key, name, surnames, email);
  }
}
