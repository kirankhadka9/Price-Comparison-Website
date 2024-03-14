const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=asus%252Brog%252Bstrix%25252Caps%25252C400&crid=18459BAHQ16P&keywords=asus%252Brog%252Bstrix&dib_tag=se&dib=eyJ2IjoiMSJ9.QIdq8dff6FqFnYN7knd8_mGqbt2DPDRQAHsjR-3j3RIXiwHHtUu_9BV-gPZSpSDm4i5qX9alFMHNdp_XkOzmL-aFbe-WZwSTeQYK_uaFg55N9TzWsuwSdXr6AZTs11TwmaIlBSLJEUO7PG53KbMOrlkJbB19wOs7oJEdcyAhTK6Ijo_DEYdAlqxv9pp5Vg7LFu6FGIvBOabMOxR0k_CulLPSkuQ-ql1W6_xJLgSU4sw.a9P1sdJszvEA3OjPNI6zZiTKjagoHOE1JrsxogD7yas&sr=8-6&rrid=SEJXFA1QRZS3AEN24AMK&experienceId=aodAjaxMain`;

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

getPrices("B0BT5SF8X4");

//https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=asus%252Brog%252Bstrix%25252Caps%25252C400&crid=18459BAHQ16P&keywords=asus%252Brog%252Bstrix&dib_tag=se&dib=eyJ2IjoiMSJ9.QIdq8dff6FqFnYN7knd8_mGqbt2DPDRQAHsjR-3j3RIXiwHHtUu_9BV-gPZSpSDm4i5qX9alFMHNdp_XkOzmL-aFbe-WZwSTeQYK_uaFg55N9TzWsuwSdXr6AZTs11TwmaIlBSLJEUO7PG53KbMOrlkJbB19wOs7oJEdcyAhTK6Ijo_DEYdAlqxv9pp5Vg7LFu6FGIvBOabMOxR0k_CulLPSkuQ-ql1W6_xJLgSU4sw.a9P1sdJszvEA3OjPNI6zZiTKjagoHOE1JrsxogD7yas&sr=8-6&rrid=SEJXFA1QRZS3AEN24AMK&experienceId=aodAjaxMain
