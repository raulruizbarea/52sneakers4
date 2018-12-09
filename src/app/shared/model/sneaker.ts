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
    public rating: number,
    public votes: number,
    public newRating?: number,
    public like?: boolean,
    public likedDate?: string,
    ) {

  }

  static fromJsonList(array): Sneaker[] {
    return array.map(Sneaker.fromJson);
  }

  static fromJson({$key, name, description, longDescription, date, price, brand, sizes,
    categories, sports, urlImage, sneakerSold, rating, votes}): Sneaker {
    return new Sneaker($key, name, description, longDescription, date, price, brand, sizes,
      categories, sports, urlImage, sneakerSold, rating, votes);
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


export enum Categories {
  Man = 'Home',
  Woman = 'Dona',
  Kid = 'Nen',
}

export enum Sports {
  Football = 'Futbol',
  Basketball = 'Bàsket',
  Training = 'Training',
  Running = 'Running',
}

export enum Brands {
  Converse = 'Converse',
  Nike = 'Nike',
  Adidas = 'Adidas',
}

