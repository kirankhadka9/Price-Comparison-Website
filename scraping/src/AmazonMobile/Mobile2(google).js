const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  ` https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=mobile%25252Caps%25252C355&crid=2LVLPM7JRG5XX&keywords=mobile%252Bphones&dib_tag=se&dib=eyJ2IjoiMSJ9.d_7v8wt4WI_nIHqWvls8Z3DCEiSaykGEhXwzrNKB0N6kUr0HQl3D8Wq-F5fgmooYC8AtlyHaley6IApbAmzGVzobvaCLGcZSfaT0a1Mfe4Ck1JBLoBcR_i78ZreYSRCjeDy0ByEyysO59vuepYmLrvZ4uKh7bP5LjpW_cfK5CAGfWy7dVugFCtRxDQBYKeC6PN1qlnAy1vMuQ7HVaRcto8mM7M30LxfXj3YQ_QRmfqg.1Tn_qpUtr0QPWgSkbKSOiflvEeQmW4xU5wqwm0NuVlw&sr=8-1&rrid=9XCWBCP8YAEVKVQNCAR9&experienceId=aodAjaxMain`;

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

getPrices("B0B3PSRHHN");
