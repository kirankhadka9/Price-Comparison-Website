const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=asus%252Btuf%252Bgaming%252Bla%25252Caps%25252C648&crid=24CUJUQTRC3BB&keywords=asus%252Btuf%252Bgaming%252Blaptop&dib_tag=se&dib=eyJ2IjoiMSJ9.w2jZtzkxuV79W6X3xA6b5Sfi2fWJvcLafTSKoEaCYJ1jzqY_PmjMybi0Ole1tDjcuX-PQMwjQdzMS-67raFUlNVQ_kSIWxnML387r4WBJWCFnAZEW_aTFVNnoPsj6ToeIps743_I65Tk_Ydksd1KzzQcmiQAKPPD6TUnY9Knf_XiT31Br8kVKv0lC3MuwBcWWwomM_EAFH5y4bRY__010eSjpYro4WLnIXhbRo0vtCo.eWce_NM9Hmi3zgkshtj9obJqBCP4sFCgmveLVANpycs&sr=8-1&rrid=BZE4NV2AKFAW4FXKW07Z&experienceId=aodAjaxMain`;

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
    pinnedElement: $("#aod-pinned-offer").textContent.trim(),
    price,
    pinnedShippedFrom,
   image
  };

  console.log(result);
}

getPrices("B0BWHDWFHR");

