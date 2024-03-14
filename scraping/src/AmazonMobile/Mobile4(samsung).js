const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  ` https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=samsung%252Bga%25252Caps%25252C351&crid=2ZYJT8X70U22B&keywords=samsung%252Bgalaxy%252Bs20&dib_tag=se&dib=eyJ2IjoiMSJ9.I0ds0hKCCglY9p3izgELsHfzTVXNwnv9py3gFe_Hux1SLdzxafkPnliAeIJA67Yrr9TskiWXw2PnpRPJzBL5MYXj4IhWo0txEuQ4x7y51hnGayAgsDuJErgdXADzSZVj6ebmbRH_663vvhJuogoDgNNszP_2z-yFpIfbDd9l6Qwe6BFwgfg6Z1voMhEg9vWz1isb48nGj7BIUhJVuU2CJwsIRUN3OeHmH-FRDSkZbaI.6XyY1tDvHscS8gfS20g9yCk43BE0m9AniuGrsjeaFu8&sr=8-1&rrid=ZQX6Q8KENA8ZNEQ8VCEA&experienceId=aodAjaxMain`;

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

getPrices("B08BW18Z78");
