const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  ` https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&rnid=2528832011&s=wireless&sprefix=mobile%25252Caps%25252C355&crid=2LVLPM7JRG5XX&keywords=mobile%252Bphones&dib_tag=se&dib=eyJ2IjoiMSJ9.ybV6knKHzO1hCSUlcXIDxr6yLeyctcnHaSzxghCtXhmXZY1VJniPgnRbJ5ULFHiY73m8lX4NFDyNhZulXPqaNT8UdNrNksZZ9WiYVnZhN9Uxz_ji5w3FPDlfH6RRFY08mJ-oTkGSm4Q-kGfsQ5Uj5bGjawU0FIp8HjYGFUot6QBm0R2DI03P-cey8PYtal1CZQHS1wqw0AovlN9MisbVx-bZfz2zyF4kEjm6bMcnGEOAIxIgL_lgq96dHpWMjjHGnkXzDavu24fMgigj4cJNdKfgf44CytbsFHQ_b_tBf8U.31R97wcRKu9IBsJowCRimUR6P52oTbcVoEGGgV1MPxg&refinements=p_89%25253ATracFone&sr=1-3&rrid=ZVH5017K4ZTQ75HJFETD&experienceId=aodAjaxMain`;

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

getPrices("B0CCT22LZ4");
