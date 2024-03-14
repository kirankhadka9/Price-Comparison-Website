//Google Pixel 7 Pro 5G
const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
`https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=google%252Bpixel%252B8%25252Caps%25252C330&crid=2RSQKLJGE081L&keywords=google%252Bpixel%252B8&dib_tag=se&dib=eyJ2IjoiMSJ9.6_3oVV52z1p5cEbVH4LUyZXoKJFEvKZhq3TYSTIeBqtDdCaqho6dnVLaBXJfGp4Jfoj3q_1VHaMjYk4dFENv4-kxYKiCyBax2a7KfyS1ex3bOhMtRitLkOQxi4CIRAza2tas50LvMvWC7MOO6u_rfouzidNki4fiJNpA1h-MIxctA5NDsUH6dEAxLiff5zI3Kia8PaDRle9EBnkSGppU1CyfFV5bmxBEkL9-yIrAupQ.-xnswnPhPpUP0PyYWiJaKMNBuQfLmn4SK8rP8wa5azk&sr=8-15&rrid=M9VMRSMTNF7W9JX1RR1F&experienceId=aodAjaxMain`
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

getPrices("B0CGT6RLT7");
