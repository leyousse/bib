var fs = require('fs');

//finding the restaurants that are Bib gourmand and Maitres Restaurateurs
module.exports.matchBib = async () =>{
    const michelin_file = fs.readFileSync('server/michelin.json');
    const michelin_list = JSON.parse(michelin_file);
    const maitresR_file = fs.readFileSync('server/maitresR.json');
    const maitresR_list = JSON.parse(maitresR_file);

    restaurants = []
    michelin_list.forEach(mich_resto => {
        maitresR_list.forEach(maitresR_resto => {
            //comparing phones (easier than names and addresses that are quite different)
          if(mich_resto.phone && maitresR_resto.tel){
            if(mich_resto.phone == maitresR_resto.tel)
          {
            restaurants.push(mich_resto);
          }
        }
        //comparing names if no phone number
        else if(!mich_resto.phone && !maitresR_resto.tel && mich_resto.name == maitresR_resto.name)
        {
            restaurants.push(mich_resto);
        }
     });
    });
      return restaurants;
 }