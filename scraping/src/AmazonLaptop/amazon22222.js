const axios = require("axios");
const { JSDOM } = require("jsdom");
//
const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=asus%252Brogstrix%252Bg18%25252Caps%25252C623&crid=IAJQLRD96EVT&keywords=asus%252Brog%252Bstrix%252Bg18&dib_tag=se&dib=eyJ2IjoiMSJ9.wBpwZjT33OFNYibp7gw8KS_6kZgGM2sMtRd3u-2Wc8pLZpBHCTItb7wzoHz7ZiJZP3KyRgYTJhuV22JIpRHEj6ML-X7T0xFublpfrei-YgKwXLPrNRhueAuqzXGcHTk3639Nt--2QUmQChbTv7AouGpe4gl_52feog0LK7DCVjQtLgW6QOz1YZnNmFv4z0fuGUWpMV3eZYrF4O1e5WQ_EKlqY8h_UWx8YItCXWbMEe0.em03SH9vFakXFxMG4kRpyiubAop7LWqOeOW5B9jva-g&sr=8-2&rrid=CQ7EZPK2029HPC8WWBEB&experienceId=aodAjaxMain`
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

getPrices("B0CRLFVRHK");
//https://www.amazon.com/gp/product/ajax/?asin=B0CRLFVRHK&pc=sp&sprefix=asus%252Brogstrix%252Bg18%25252Caps%25252C623&crid=IAJQLRD96EVT&keywords=asus%252Brog%252Bstrix%252Bg18&dib_tag=se&dib=eyJ2IjoiMSJ9.wBpwZjT33OFNYibp7gw8KS_6kZgGM2sMtRd3u-2Wc8pLZpBHCTItb7wzoHz7ZiJZP3KyRgYTJhuV22JIpRHEj6ML-X7T0xFublpfrei-YgKwXLPrNRhueAuqzXGcHTk3639Nt--2QUmQChbTv7AouGpe4gl_52feog0LK7DCVjQtLgW6QOz1YZnNmFv4z0fuGUWpMV3eZYrF4O1e5WQ_EKlqY8h_UWx8YItCXWbMEe0.em03SH9vFakXFxMG4kRpyiubAop7LWqOeOW5B9jva-g&qid=1710144445&sr=8-2&rrid=CQ7EZPK2029HPC8WWBEB&experienceId=aodAjaxMain
//https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=asus%252Brog%252Bstri%25252Caps%25252C555&crid=2OL714APHR9SP&keywords=asus%252Brog%252Bstrix&dib_tag=se&dib=eyJ2IjoiMSJ9.QIdq8dff6FqFnYN7knd8_mGqbt2DPDRQAHsjR-3j3RIXiwHHtUu_9BV-gPZSpSDm4i5qX9alFMHNdp_XkOzmLxyx8SJHAeyne40EEtjK8uVhgfSFyQ1xSroEuwCroirrmaIlBSLJEUO7PG53KbMOrlkJbB19wOs7oJEdcyAhTK6Ijo_DEYdAlqxv9pp5Vg7L4xfTqm_LflsSQoNAg9f7JP1m91TIha3kXfURqQNOUw8.UIrSxkd1_eFxGwEWSpxRU4ke2hQ78V_w9-dtZAvvl8k&sr=8-6&rrid=2521Y4A48NVBVSRRKYN9&experienceId=aodAjaxMain