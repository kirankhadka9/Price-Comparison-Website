const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=dell%252Be7470%25252Caps%25252C364&crid=2E458WA4HU334&keywords=dell%252Be7470&dib_tag=se&dib=eyJ2IjoiMSJ9.rcWM5CIwKPuNDKEiANYD4ZnfYD22sLcW75vWElTLhrkxJw2bAPkd4NuBE1W38cSXAubtzZHwdw27AvymVWgvnheVvMr8JIQAqGRu5LOYDT4ZBm8ZbGuNxUgoGalZD5htXPnP5UK6MqDAOeGrz8yfEA.OfpdcgwTrr9S4HWlczeaPSzwheP53djVWeNFbqCJcaA&sr=8-6&rrid=V97VVFNVEYD7196CYAX9&experienceId=aodAjaxMain`
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
    pinnedElement: $("#aod-pinned-offer").textContent.trim(),
    price,
    pinnedShippedFrom,
   image
  };

  console.log(result);
}

getPrices("B01N4AD0EG");

//https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=dell%252Be7470%25252Caps%25252C364&crid=2E458WA4HU334&keywords=dell%252Be7470&dib_tag=se&dib=eyJ2IjoiMSJ9.rcWM5CIwKPuNDKEiANYD4ZnfYD22sLcW75vWElTLhrkxJw2bAPkd4NuBE1W38cSXAubtzZHwdw27AvymVWgvnheVvMr8JIQAqGRu5LOYDT4ZBm8ZbGuNxUgoGalZD5htXPnP5UK6MqDAOeGrz8yfEA.OfpdcgwTrr9S4HWlczeaPSzwheP53djVWeNFbqCJcaA&sr=8-6&rrid=V97VVFNVEYD7196CYAX9&experienceId=aodAjaxMain