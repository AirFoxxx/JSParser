const { promises } = require('fs');
const https = require('https');

  let createOptions = (ItemID) =>
  {
    return {
        hostname: 'secure.runescape.com',
        port: 443,
        path: '/m=itemdb_rs/api/catalogue/detail.json?item=' + String(ItemID),
        method: 'GET'
      };
  };


  var dict = {};



let promisable = (options, collection) => {
    return new Promise((resolve, reject) => {

        req = https.request(options, (res) => {

            var body = '';

            res.on('data', (d) => 
                {
                   body +=d;
                });
           
            res.on('end', function()
                {
                var response = JSON.parse(body);
                var untrimmed =  response.item.current.price;
                var trimmed = untrimmed.replace(",", "");
                console.log("Item: ", response.item.name , "- Price: ", trimmed);

                dict[String(collection) + " - " + String(response.item.name)] =  trimmed;
                resolve();
                });

        });
    
        req.on('error', (e) => 
            {
                console.error(e);
                reject(e);
            });

        req.end();
        
    });
};

var armadyl = 0;
var bandos = 0;
var dragonkin = 0;
var saradomin = 0;
var zamorak = 0;
var zaros = 0;

Promise.all(
[
    promisable(createOptions(49472), "Armadyl"),
    promisable(createOptions(49474), "Armadyl"),
    promisable(createOptions(49468), "Armadyl"),
    promisable(createOptions(49466), "Armadyl"),
    promisable(createOptions(49470), "Armadyl"),

    promisable(createOptions(49476), "Bandos"),  
    promisable(createOptions(49478), "Bandos"), 
    promisable(createOptions(49480), "Bandos"), 
    promisable(createOptions(49482), "Bandos"), 
    promisable(createOptions(49484), "Bandos"), 

    promisable(createOptions(50692), "Dragonkin"),
    promisable(createOptions(50694), "Dragonkin"),
    promisable(createOptions(50686), "Dragonkin"),
    promisable(createOptions(50690), "Dragonkin"),
    promisable(createOptions(50688), "Dragonkin"),

    promisable(createOptions(49490), "Saradomin"),  
    promisable(createOptions(49492), "Saradomin"),  
    promisable(createOptions(49494), "Saradomin"),  
    promisable(createOptions(49486), "Saradomin"),  
    promisable(createOptions(49488), "Saradomin"),  


    promisable(createOptions(49496), "Zamorak"),
    promisable(createOptions(49498), "Zamorak"),
    promisable(createOptions(49500), "Zamorak"),
    promisable(createOptions(49502), "Zamorak"),
    promisable(createOptions(49504), "Zamorak"),


    promisable(createOptions(49514), "Zaros"),
    promisable(createOptions(49510), "Zaros"),
    promisable(createOptions(49512), "Zaros"),
    promisable(createOptions(49506), "Zaros"),
    promisable(createOptions(49508), "Zaros")

]
).then( () => 
{
    console.log(dict);
    for(var key in dict)
    {
        if(key.startsWith("Armadyl"))
        {
            armadyl += parseInt(dict[key]);
        } else if(key.startsWith("Bandos"))
        {
            bandos += parseInt(dict[key]);
        }else if(key.startsWith("Dragonkin"))
        {
            dragonkin += parseInt(dict[key]);
        } else if(key.startsWith("Saradomin"))
        {
            saradomin += parseInt(dict[key]);
        } else if(key.startsWith("Zamorak"))
        {
            zamorak += parseInt(dict[key]);
        } else if(key.startsWith("Zaros"))
        {
            zaros += parseInt(dict[key]);
        } else 
        {
            console.log("ERROR ", key, dict[key])
        }
    }

    console.log("Armadyl (Stormguard) - ", armadyl);    
    console.log("Bandos (Warforge) - ", bandos);   
    console.log("Dragonkin (Orthen) - ", dragonkin);   
    console.log("Saradomin (Everlight) - ", saradomin);   
    console.log("Zamorak (Infernal) - ", zamorak);   
    console.log("Zaros (Kharidet) - ", zaros);   

});







