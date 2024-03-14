const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=msi%252Bstealth%252Bgs77%25252Caps%25252C578&crid=GZKJ6PMAGTD&keywords=msi%252Bstealth%252Bgs77&dib_tag=se&dib=eyJ2IjoiMSJ9.safy3uFee5phct0v_6IsGSaNo9qRqTNiRdHOlT8KcURsMy6loI9a81pWItSj5KYDlGzfNoo34490HP8qRao4nMwZREF2i2arnyKrJjrVm2e3Ldt3BM07ghGKtnpvqRVtBQyGH2urGSu0CRv9rpO8ImE_JBP52pURWI7qWC_cawgge2eqbaWkD1d4ppSG-ks5IvNzphOgIPeOBcQGM5AcSgj4HnLppprgjv-8ykwIMaQ.X_rUx5obUxIIVYXv1WabDdjwG8NkOMbzXK9tOYYiX1E&sr=8-2&rrid=PY8ZH3FD3AV0DJT8GPCM&experienceId=aodAjaxMain`;

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
    pinnedElement: $("#aod-asin-block-asin").textContent.trim(),
    price,
    pinnedShippedFrom,
    image
  };

  console.log(result);
}

getPrices("B09RBC154G");

//