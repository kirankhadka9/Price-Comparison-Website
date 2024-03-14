const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=motorola%252Bmoto%252Bg%25252Caps%25252C645&crid=3BVS3XPZNM60F&keywords=motorola%252Bmoto%252Bg%252Bpower&dib_tag=se&dib=eyJ2IjoiMSJ9.YF8ZEytc3Yu6Lp1uLrDN9a9QMGO4RXT3QVB2WTQNi-EWwUtH62KJVFR__88aXCkHHJ3H-L6aUielXzKCCk3yh0qDVBdpppuArfzyPzIxj6ZNe_wmx4K8JLNaQZd7lng-6Z3KbuPNS7QaUIK4da73BM9VdCOMRsSlPl3R8EzVaV7Na8zm35BwCzLoxUNXo7YrD4_OWHYD-mYIExG2Md2OSuyAccsyD6zzw-BlSYuDQu8.ZBGo4Ti_Suf9GSuQBTm6OLS8vXL6rztlE7kpcAAP2zY&sr=8-1&rrid=HT3G1CVH1NCN55J69N60&experienceId=aodAjaxMain`;

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
      pinnedElement: $("#aod-asin-title").textContent.trim(),
      price,
      pinnedShippedFrom,
      image
      
    };

  console.log(result);
}

getPrices("B0BYL2G3SP");


 //getPrices(");
 //https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=motorola%252Bmoto%252Bg%25252Caps%25252C645&crid=3BVS3XPZNM60F&keywords=motorola%252Bmoto%252Bg%252Bpower&dib_tag=se&dib=eyJ2IjoiMSJ9.YF8ZEytc3Yu6Lp1uLrDN9a9QMGO4RXT3QVB2WTQNi-EWwUtH62KJVFR__88aXCkHHJ3H-L6aUielXzKCCk3yh0qDVBdpppuArfzyPzIxj6ZNe_wmx4K8JLNaQZd7lng-6Z3KbuPNS7QaUIK4da73BM9VdCOMRsSlPl3R8EzVaV7Na8zm35BwCzLoxUNXo7YrD4_OWHYD-mYIExG2Md2OSuyAccsyD6zzw-BlSYuDQu8.ZBGo4Ti_Suf9GSuQBTm6OLS8vXL6rztlE7kpcAAP2zY&sr=8-1&rrid=HT3G1CVH1NCN55J69N60&experienceId=aodAjaxMain


