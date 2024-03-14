const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=nokia%252Bc300%25252Caps%25252C386&crid=28WL4QHNCWAAN&keywords=nokia%252Bc300%252Bunlocked%252Bphone&dib_tag=se&dib=eyJ2IjoiMSJ9.m1jKGpm5FD6YijC4FVy0fHAudAQyqcCH1fug4GpotDrG6andctguGcDzPrAZJzTo1D_0x7yZ2gQBuP84KN8KKVEyb-s44GGqWkuymW4Zr1JOS73H9fRT2zfUoyDWRV9gldsIwTq5MrPjx70n5UFDjhTcS3LMLFcDfa5Xtiyz8n6D30rKBUTmXGJcnP2W3PIDbg0KAkC6XBjnLrZF-3pnKpAngUqHQd6KQie2lxwVMfI.N5Snc6iJQFIh3O5-YaDgKCtesOwDnFwurZjBU4piS8I&sr=8-1&rrid=TAXXMPVTQ1SZWXSZ0FNH&experienceId=aodAjaxMain`

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

getPrices("B0C92C436C")
