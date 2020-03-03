const axios = require('axios');
const cheerio = require('cheerio');

//Scrape the restaurants page after page
module.exports.scrapeRestaurant = async () => {
    let tab=[];
    for(page = 1; page < 156; page++)
    {
        options = {
        'url' : 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult',
        'method' : 'post',
        'headers' : {'content-type':'application/x-www-form-urlencoded'},
        'data': `page=${page}&sort=undefined&request_id=a490edcdefedc3f57a695ce1a363969f&annuaire_mode=&annuaire_action=&annuaire_action_arg=&annuaire_appli=&annuaire_as_no=`//querystring.stringify(playload)
        }

        const response = await axios(options);
        const {data, status} = response;
        const names = [];
        const addresses = [];
        const phones = [];

        if (status >= 200 && status < 300) {
        const $ = cheerio.load(data)
        
        // Get the properties in tabs (name,phone,address)
        //name
        $('.single_libel a').each((index,value) => {
            temp = $(value).text();
            temp = temp.trim();
            if(!temp){names.push('/');}
            else{names.push(temp);}
         });
         //phone
         regex = /[0-9]{2,} {0,1}[0-9]{2,} {0,1}[0-9]{2,} {0,1}[0-9]{2,} {0,1}[0-9]{2,}/g;
         $('.single_info3').each((index,value) => {
            temp = $(value).text();
            temp = temp.match(regex);
            if(!temp){phones.push('/');}
            else{phones.push(temp.toString());}
          });
         //address
         $('.single_info3').each((index,value) => {
            temp = $(value).text();
            regex2 = /\n/g;
            regex3= / {2,}/g;
            regex4 = / /;
            temp = temp.replace(regex,'');
            temp = temp.replace(regex2,' ');
            temp = temp.trim();
            temp = temp.replace(regex3,' ');        
            if(!temp){addresses.push('/');}
            else{addresses.push(temp);}
         });
        
        //Fill the tab with the restaurants from the page
        for(i=0;i<10;i++)
        {
            restaurant = {
                name: names[i],
                address: addresses[i],
                tel: phones[i],
            };
            tab.push(restaurant);
        }
        } else return ('error');
    }
    return tab;

};
