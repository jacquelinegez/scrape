var request = require("request");
var cheerio = require("cheerio");
//call back as a param
var scrape = function (cb) {

    request({
        method: "GET",
        url: "http://www.nytimes.com",
     }, (err, res, body)=> {
     if (err) return console.error(err);


        var $ = cheerio.load(body);
      

        var articles = [];

        $(".theme-summary").each(function(i, element){
            //removes any whitespace in the variable head and summary
            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim();
            //if scraper was able to get text from both children objects use replace regex method 
            //Regex method to clean text with whitespace
            if(head && sum) {
                var headNeat = head.replace (/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            
              var dataToAdd =  {
                headline: headNeat,
                summary: sumNeat
            };
            articles.push(dataToAdd);

            }
           
        });
    
    cb(articles);
});
};
    module.exports = scrape;
