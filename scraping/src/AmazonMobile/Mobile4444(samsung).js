const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
`https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=samsung%252Bgalaxy%252Ba03%25252Caps%25252C370&crid=OP69W0DL34TA&keywords=samsung%252Bgalaxy%252Ba03&dib_tag=se&dib=eyJ2IjoiMSJ9.y6rsJ-TgxczXS3OG1Xy55diDV0hrHV28pgn63A1tpkVuGy602vSzCkJNq_DCEPoEKFPDswSpi9d-FMqauICZ-w.JG0F7DYo-_TRF7gO-MT646fmJ48finuEMTysoqZLV38&sr=8-4&rrid=VYABE1JF1VEB5Y8PNEZ6&experienceId=aodAjaxMain`
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

getPrices("B09T2JFWKR");

