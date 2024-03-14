const axios = require('axios');
const cheerio= require('cheerio')
const url = 'https://www.target.com/p/asus-vivobook-16-wuxga-1920-x-1200-laptop-amd-ryzen-7-5800hs-12gb-ram-512gb-ssd-windows-11-home-quiet-blue/-/A-89397498#lnk=sametab';
function getTextBetweenTags(tag, str) {
    const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`);
    const match = regex.exec(str);
    return match ? match[1].trim() : null;
  }
  
  function getTextAfter(text, str) {
    const regex = new RegExp(`${text}(.*?)(?:,|<\/.*?>)`);
    const match = regex.exec(str);
    const extractedText = match ? match[1].trim() : null;
  
    // Remove unwanted characters around the price
    const cleanedText = extractedText ? extractedText.replace(/[^0-9.,]+/g, '') : null;
  
    return cleanedText;
  }
  
  function getImageUrl(htmlString) {
    const regex = /<img alt=".+?" src="(.+?)"/;
    const match = regex.exec(htmlString);
    return match ? match[1] : null;
  }
  
  axios.get(url)
    .then(function (response) {
      const $ = cheerio.load(response.data);
      const title = getTextBetweenTags('title', response.data);
      const price = getTextAfter('current_retail', response.data);
      const image = getImageUrl(response.data);
      const description = $("div[data-test='item-details-description']").text().trim();
      // Extract only the relevant part of the title and remove ": Target"
      const cleanTitle = title ? title.replace(/[-–] Target$/i, '').replace(/: Target$/, '').trim() : null;
  
      console.log('Title:', cleanTitle);
      console.log('Price:', `$${price}`);
      console.log('Description:', description);
      console.log('Image:', image);
    })
    .catch(function (error) {
      console.log('Error fetching data:', error);
    });




