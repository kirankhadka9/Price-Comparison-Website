const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.target.com/p/motorola-moto-g-stylus-5g-2023-unlocked-256gb-cosmic-black/-/A-88685012#lnk=sametab';

function getImageUrl(htmlString) {
    const regex = /<img alt=".*?" src="(.*?)"/;
    const match = regex.exec(htmlString);
    return match ? match[1] : null;
  }
axios.get(url)
    .then(function (response) {
        const $ = cheerio.load(response.data);

        const description = $("div[data-test='item-details-description']").text().trim();

        const title = $("title").text().trim().replace(/: Target$/, '');
        const price = getTextAfter('current_retail', response.data);
        
        const imageUrl = getImageUrl(response.data);
        console.log('Title:', title);
        console.log('Price:', `$${price}`);
        console.log('Description:', description);
        console.log('Image:', imageUrl);
    })
    .catch(function (error) {
        console.log('Error fetching data:', error);
    });

    function getTextAfter(text, str) {
        const regex = new RegExp(`${text}(.*?)(?:,|<\/.*?>)`);
        const match = regex.exec(str);
        const extractedText = match ? match[1].trim() : null;
    
        // Remove unwanted characters around the price
        const cleanedText = extractedText ? extractedText.replace(/[^0-9.,]+/g, '') : null;
    
        return cleanedText;
    }
    
