
const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=nokia%252B2760%252Bfli%25252Caps%25252C721&crid=3O18J40XCPIUA&keywords=Nokia%252B2760%252Bflip&dib_tag=se&dib=eyJ2IjoiMSJ9.VDDhXoUNLEolwVGWONgsw-X1mae8S-6F2YHhlieyq3GNVqBB3srn0IHBlUsaL8JJAE0adHxS1-9nyFb1_vdP3L0lH0uUxEzLnTjGq0TK5iHn_lfqzATXptE1KRieo7IoGIIUwnkWXFsx-IY0O-xAA_RdAR6GCr4DznNym2aPC8eze0lJTB5Ygw9FqYqb96nq5_P3nReqni8AIQEIVZxVmK-QYXzREb2FedMHN_1KxGY.DQsMgtHJq8Hw2jJxrS9xPJSdygnhm_WyDGjurbrxDeA&sr=8-1&rrid=R9JDGZ98PBJYPRKK61KP&experienceId=aodAjaxMain`
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

getPrices("B09T2QF3MP")
