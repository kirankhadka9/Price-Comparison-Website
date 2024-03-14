const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=hp%252Bvi%25252Caps%25252C489&crid=29A1RXE2NBUA&keywords=hp%252Bvictus%252B15.6%252Bgaming%252Blaptop&dib_tag=se&dib=eyJ2IjoiMSJ9.KmuPQwaU9i1D-T94FJ74_ae_5AKz3aqAIsjTqcpfBzmPliR5kOuwOvltOcSlD_JiMmaAFuGZhRtRkjEqNXkZrSqPgsCLOxnUE6oFHhHdMIGsSmY_jmjvdOCclmfrVLmA_zljmHsrtGdZnwcdogZ0EHaXu1LQIHJwPejcPxSugW5kpYruTilKeyKrXxMZgPPIva82IqSQPOCHwxf3dug8MNNNohZ1v7ihzz3TplMcKs8.TVBWwgdTM4zzmBny6tgcLzR7yIOKzwA7Ipn9oVEcd6o&sr=8-1&rrid=5693N9K41BK5A50716CN&experienceId=aodAjaxMain`;
  

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



getPrices("B0CFSBT85B")
