const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  ` https://www.amazon.com/gp/product/ajax/aod?asin=${product_id}&pc=sp&sprefix=tracfone%252B%25252Caps%25252C381&crid=2B12VK1VEE53W&keywords=Tracfone&dib_tag=se&dib=eyJ2IjoiMSJ9.ZrC6wIOlbbcyPIdPY-zPI65vhjjDMmkNHRmxft-cHeMPn-NW0G3oF-50ZN78Vs1BevscQNWFiLLqQXUTnoOX79K--pvyn0SDKuWR61_vKU9gyf2tcfI2Hy8f8z8CtKIxi5mgUs0v2j4pPKpK7jIbTiMIMnqE-AGytGp9cJHm8HVXpGwOw6E8HHHzHsUhmBIiAb-VqsEGotWbRmgR9-AzDH2mSGymluf77ycEUIXQZnc.kYjKAcKQBYoTaM1lnF39pcM4g9aFnJgFjbRcnZby5so&sr=8-6&rrid=VRHYNESWF4Y8JC9F79KX&experienceId=aodAjaxMain`;

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

getPrices("B0BYL2G3SP");
