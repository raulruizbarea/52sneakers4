export class Sneaker {
  constructor(
    public $key: string,
    public name: string,
    public description: string,
    public longDescription: string,
    public date: string,
    public price: string,
    public brand: string,
    public sizes: string,
    public categories: string,
    public sports: string,
    public urlImage: string,
    ) {

  }

  static fromJsonList(array): Sneaker[] {
    return array.map(Sneaker.fromJson);
  }

  static fromJson({$key, name, description, longDescription, date, price, brand, sizes, categories, sports, urlImage}): Sneaker {
    return new Sneaker($key, name, description, longDescription, date, price, brand, sizes, categories, sports, urlImage);
  }
}
