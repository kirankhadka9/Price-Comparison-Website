const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=msi%252Bl%25252Caps%25252C489&crid=9NZ1GUEA7N1B&keywords=msi%252Blaptop&dib_tag=se&dib=eyJ2IjoiMSJ9._Ck85LnuoxFpPGaZFnzzafx9bRFxVW32Ks9p7fRa2DSSJqJXOAOHDQyYhPhAXhPpcpdcXuxUnwOT3SXAgGD6tO-vCrP5YhixG1XOEs6F0Y_xOEPgCWOJh80AcEHqnZfUTKAyFvi3_pOooQkmtF-H9_631cSLDFOjGAz8K1ZOuCMe4uidg0_1J_t5v9DvPq5q0angVHeHq1-FYQBGHZb92r_GM1r_lyQ9-w_zlmszVWY.68b3L-nXyi3rsVS-3Y1iQl6j5pA4IU5rT09MUc5ou6E&sr=8-4&rrid=RWQ5963B3A3Y333T8DS1&experienceId=aodAjaxMain`;

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
    pinnedElement: $("#aod-asin-title-text").textContent.trim(),
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

getPrices("B0C42F3JYM");
