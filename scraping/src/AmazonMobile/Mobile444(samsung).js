
const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
`https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=samsung%252Bgalaxy%252B23%252Bultra%252Brefu%25252Caps%25252C445&crid=2NGLUVP7NQH42&keywords=samsung%252Bgalaxy%252B23%252Bultra%252Brefurbished&dib_tag=se&dib=eyJ2IjoiMSJ9.YcfsR_lqO9xnhb1e5OsjvM77yp0kXZtjlRVbdr2JzNGi4E3FEzIh1M5ItFhtxWxcTqQDCFmTb5pFl1dnmJ354pV-veNgYSLPPqFjxQ4nwHMXYTGcFA6rXAVTxq6CRr802zlfWF_P4BrYsSjuMJfF1ena3MqkjknwOjHpdVLjMShwxIQtEZm6wcGjmM-obzSe0tdQrpVKzBzo3VVmoqFJxcv2yd_kPuQks2G6Tk0BR5k.7BsVgIX5dUUA3MVjDx_b1BEnVniSh6HNzoGPtUtCTac&sr=8-7&rrid=GCZHB4PFTRHN9B8R6AY4&experienceId=aodAjaxMain`


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

getPrices("B0BV7F2173");
