export class User {
  constructor(
    public $key: string,
    public name: string,
    public surnames: string,
    public email: string,
    public password: string) {

  }

  static fromJsonList(array): User[] {
    return array.map(User.fromJson);
  }

  static fromJson({$key, name, surnames, email, password}): User {
    return new User($key, name, surnames, email, password);
  }
}
