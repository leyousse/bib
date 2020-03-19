const michelin = require('./michelin');
const maitreRestaurateur = require('./maitresR');
const both = require('./both');
const axios =require('axios');
const fs = require('fs');

async function Michelin () {
  try {
    console.log('🕵️‍♀️  browsing https://guide.michelin.com/fr');
    const pages = await michelin.Pages("https://guide.michelin.com/fr/fr/restaurants/bib-gourmand");
    const urls = await michelin.urls(pages);
    let restaurants=[];
    for(url of urls){
      await michelin.scrapeRestaurant(url,restaurants);
    }
    //write in json
    const json = await JSON.stringify(restaurants,null,2);
    fs.writeFileSync('./michelin.json',json);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function MaitresR () {
  try {
    console.log('🕵️‍♀️  browsing https://www.maitresrestaurateurs.fr');
    let restaurants = [];
    restaurants = await maitreRestaurateur.scrapeRestaurant();
    //write in json
    const json = await JSON.stringify(restaurants,null,2);
    fs.writeFileSync('maitresR.json',json);
    process.exit(0)
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function Both(){
  try{
    console.log('🕵️‍♀️  Matching the results');
    let result = await both.matchBib();
    const json = await JSON.stringify(result,null,2);
    fs.writeFileSync('result.json',json);
    process.exit(0)
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

//Michelin();
MaitresR();
//Both();