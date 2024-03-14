
const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
`https://www.amazon.com/gp/product/ajax/?asin=${product_id}&m=&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=8-3&pc=dp&experienceId=aodAjaxMain`
async function getPrices(product_id) {
  const productUrl = getProductUrl(product_id);
  const { data } = await axios.get(productUrl, {
    headers: {  
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8",
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
    pinnedElement: $("#aod-pinned-offer").textContent.trim(),
    price,
    pinnedShippedFrom,
    image
   
  };

  console.log(result);
}


//https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=acer%252Bnitro%252B6%252Bnvidi%25252Caps%25252C412&crid=2T9GA28GG0VH&keywords=acer%252Bnitro%252B6%252Bnvidia&dib_tag=se&dib=eyJ2IjoiMSJ9.GsmxFM0FhEUq34B7jpWo3GmLNaLxhuapOPn56nnEjJCA66Di6EnjjgywPPjeO7QTVzVi-db16U_j0AUbSEsOrE04EcydMVK0cUExjPp3cAy5WLnnXJWjKfU3jra1b7W0PRj6AYKD53_rfVSnF_lmvwocioQcBHlTMr-jD5nj4paa7GTBHB0GzKnA7sTuIXWpv826fLph8wu677PLHdOtasuYYgjBW8end8Q4CuNdJF0.XWdE2SrPVpz1GbGbhnUE2Fwy0k7DhmzO-2EkFz37xIY&sr=8-1&rrid=GH4F1J0SBBMPP0QRQM0W&experienceId=aodAjaxMain
getPrices("B09R65RN43")