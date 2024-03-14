const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=google%252Bphon%25252Caps%25252C383&crid=GZTG7YI905LQ&keywords=google%252Bphone&dib_tag=se&dib=eyJ2IjoiMSJ9.xs5ajdVFvC2BmKcNQ8yag9vEuEfzst-LxXtMX3f3DM3MhRLUZpWmAkIigpOVnmcSQ07fLAhfDoWJ9WgUGuwdh9-sxW1iIonAs71HCWtoy6anj4OlXOWHOg4V175upGXnOp4KQJRcHzkHrW9uj6pd0cAUB4sj3YQDz4ehlP4TdWNU6lSxJTDaJn_ceQElnp48EmHdnIyKLepLFBMJ2ESPGnHP4qJH6spUXXENsnIEios.4KhGf21CSEVDFdU_BA-zqSmOXhhc5TMD1OD4cMjLkuo&sr=8-4&rrid=FHZPBVYBMPJ35WJD9RCD&experienceId=aodAjaxMain`;

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

  const price = dom.window.document.querySelector(".a-offscreen").textContent;

  // Update the selector
  const pinnedShippedFrom = $("#aod-offer-shipsFrom").textContent.trim();



  const image = $("#pinned-image-id img").getAttribute("src");
  const result = {
    pinnedElement: $("#aod-sticky-pinned-offer").textContent.trim(),
    price,
    pinnedShippedFrom,
    image
    
  };

  console.log(result);
}

getPrices("B0CGTJ12Z9");
