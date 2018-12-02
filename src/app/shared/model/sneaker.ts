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
    public sneakerSold: number,
    public like?: boolean,
    public likedDate?: string,
    ) {

  }

  static fromJsonList(array): Sneaker[] {
    return array.map(Sneaker.fromJson);
  }

  static fromJson({$key, name, description, longDescription, date, price, brand, sizes,
    categories, sports, urlImage, sneakerSold}): Sneaker {
    return new Sneaker($key, name, description, longDescription, date, price, brand, sizes,
      categories, sports, urlImage, sneakerSold);
  }
}

export class SneakersPerUser {
  constructor(
    public $key: string,
    public like?: boolean,
    public likedDate?: string,
    public sneaker?: Sneaker,
    ) {

  }

  static fromJson({$key}): SneakersPerUser {
    return new SneakersPerUser($key);
  }
}
