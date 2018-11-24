export class News {
  constructor(
    public $key: string,
    public author: string,
    public date: string,
    public description: string,
    public longDescription: string,
    public title: string,
    public show: string,
    public urlImage: string) {

  }

  static fromJsonList(array): News[] {
    return array.map(News.fromJson);
  }

  static fromJson({$key, author, date, description, longDescription, title, show, urlImage}): News {
    return new News($key, author, date, description, longDescription, title, show, urlImage);
  }
}
