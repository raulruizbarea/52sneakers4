import { firebaseConfig } from './src/environments/firebase.config';
import { dbData } from './db-data';
import { initializeApp, database } from 'firebase';

// Execute node_modules/.bin/ts-node populate-db.ts

console.log('Initizalizing Firebase database ... ');

initializeApp(firebaseConfig);

const newsRef = database().ref('news');
const sneakersRef = database().ref('sneakers');

dbData.news.forEach( newJson => {
  console.log('adding new', newJson.title);

  const newRef = newsRef.push({
    title: newJson.title,
    description: newJson.description,
    longDescription: newJson.longDescription,
    date: newJson.date,
    author: newJson.author,
    urlImage: newJson.urlImage,
    show: newJson.show,
  });

});

dbData.sneakers.forEach( sneakerJson => {
  console.log('adding sneaker', sneakerJson.name);

  const sneakerRef = sneakersRef.push({
    name: sneakerJson.name,
    description: sneakerJson.description,
    longDescription: sneakerJson.longDescription,
    date: sneakerJson.date,
    price: sneakerJson.price,
    brand: sneakerJson.brand,
    sizes: sneakerJson.sizes,
    categories: sneakerJson.categories,
    sports: sneakerJson.sports,
    urlImage: sneakerJson.urlImage,
  });

});
