const axios = require('axios');
const cheerio= require('cheerio')
const url = 'https://www.target.com/p/hp-victus-15-6-full-hd-gaming-laptop-amd-ryzen-5-7535hs-8gb-ram-512gb-ssd-nvidia-geforce-rtx-2050-windows-11-home/-/A-89927312#lnk=sametab';

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




