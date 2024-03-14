const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `
  https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&rnid=2528832011&s=electronics&sprefix=%25252Caps%25252C387&crid=1ATKD2T3PB721&keywords=laptop&dib_tag=se&dib=eyJ2IjoiMSJ9.ev7jXSll-J-BnI7TaNVceET4atttSBvPw5oo1BbeNSf2zElT71t_XxHXchY3vb92I-XQNIl9cK6_IFKeWpH9zdNS_YIMBjuldJZTUWwhLnwKSG7_elliKie07P7Wf4qhJSHmF6ml6wUa1CJi31U-27O3HV36qHWw0Fb8vdL993vXrQQqiWPkjj-xFxhuLgTmE44-hybYVzLKV7z4z1zLvOYcZCRFohhRyynDPoMXn_6Eh7i1hT2oqFoGKXpGeOv89zSKHfntV3LDl-cQpOZOtItn4_7el3nKQRVBZHOfsLo.OaV_V_XqJhu1YVHmc3oGrzXoOBUaPMgsoG2hcrTWm-A&refinements=p_89%25253AAlienware%25257CMicrosoft&sr=1-3&rrid=KFR6C0Z9KJ6ARV80VD7C&experienceId=aodAjaxMain`;

async function getPrices(product_id) {
  const productUrl = getProductUrl(product_id);
  const { data } = await axios.get(productUrl, {
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      Host: "www.amazon.com",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Pragma: "no-cache",
      TE: "Trailers",
      "Upgrade-Insecure-Requests": 1,
    },
  });
  const dom = new JSDOM(data);
  const $ = (selector) => dom.window.document.querySelector(selector);
  const $$ = (selector) => dom.window.document.querySelectorAll(selector);
  const image = $("#pinned-image-id img").getAttribute("src");
  const price = dom.window.document.querySelector(".a-offscreen").textContent;

  // Update the selector
  const pinnedShippedFrom = $("#aod-offer-shipsFrom").textContent.trim();



  const result = {
    pinnedElement: $("#aod-sticky-pinned-offer").textContent.trim(),
    price,
    pinnedShippedFrom,
   image
  };
  // console.log(result.pinnedElement);
  // console.log(price);
  // console.log(pinnedShippedFrom);
  module.exports=result;
  console.log(result);
}

getPrices("B0C5MSQLRG");
