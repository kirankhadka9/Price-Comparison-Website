const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=motorola%25252Caps%25252C433&crid=33W8M9P8SZL86&keywords=motorola&dib_tag=se&dib=eyJ2IjoiMSJ9.X3MdK6XxSdeL4XicOAad3bbOHwEgDu7DaACj-wa5nzJGusss8hFlYC_isGe8olHcbB3xBA4GO4-Yr8C4QKg17d2qkFIGDElwJEtOxjpQSUWr56qWxDfYaFstvZsCl9Op6Nwnf_SLlKsm2VQrTT_n8rSbuYe25xhbq8xXCvFtQfFZkqJWoFEvqOr8BIvJUtgA8nPubW71pIHiyWqV4ihctmcDNrDDGqQ4FQezDwhzHS0.r05F3zdD9mIuKt5GMR_MMVtm31EWN2y52aeIt4cyw0E&sr=8-3&rrid=W3ZWKTFXAD3EYHZ7CYB7&experienceId=aodAjaxMain`;

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

getPrices("B0BYLRBG4M");
