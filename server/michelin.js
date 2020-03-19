const axios = require('axios');
const cheerio = require('cheerio');
var fs = require('fs');

//Get the number of pages
module.exports.Pages = async url =>{
  const response = await axios(url);
  const {data, status} = response;
  const $ = cheerio.load(data);
  const allRestaurants = $("body > main > section.section-main.search-results.search-listing-result > div > div > div.search-results__count > div.d-flex.align-items-end.search-results__status > div.flex-fill > h1")
    .text()
    .trim()
    .split(" ");
  const pages = Math.ceil(Number(allRestaurants[allRestaurants.length - 2]) / 20);
  return pages;
}

//Get the urls
module.exports.urls = async (pages) => {
  const url = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/";
  let links = [];
  for (i = 1; i <= pages; i++) {
    const response = await axios(`${url}${i}`);
    const { data, status } = response;

    if (status >= 200 && status < 300) {
      const $ = cheerio.load(data);
      $('.link').each((index, value) => {
        let link = $(value).attr('href');
        links.push(`https://guide.michelin.com${link}`);
      });
    }
    else console.error('error');
  }
  return links;
};

//Scrape a restaurant
module.exports.scrapeRestaurant = async (url, tab) => {
  const response = await axios(url);
  const {data, status} = response;

if(status >=200 && status <300){

  const $ = cheerio.load(data)
  const name =  $('.section-main h2.restaurant-details__heading--title').text();
  const address = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section.section.section-main.restaurant-details__main > div.restaurant-details__heading.d-none.d-lg-block > ul > li:nth-child(1)').text();
  phone = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div:nth-child(1) > div > div > a').attr("href");
  //scraping more to have details on the website
  const details = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text().trim().replace(/\s/g, '').split("•");
  const price = details[0];
  const type = details[1];
  const experience_array = $('#experience-section > ul > li:nth-child(2)').text().trim().split(' ');
  const experience = experience_array[experience_array.length - 2] + ' ' + experience_array[experience_array.length - 1];
  //change the phone format to compare it later with maitres restaurateurs
  if(phone){phone = phone.replace('tel:+33 ',0);}
  const restaurant = {
    name: name,
    address: address,
    phone: phone,
    price: price,
    type: type,
    experience,
    url:url
  };
  tab.push(restaurant);
} else console.error('error');
return tab;
};
