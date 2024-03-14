const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=msi%252Braider%252Bge68%25252Caps%25252C489&crid=2MSAVFWB9JAG5&keywords=msi%252Braider%252Bge68&dib_tag=se&dib=eyJ2IjoiMSJ9.Fv5_k7n5MkHIisvuByTr0AQL3b2EsElp9PbcP_YNyVnFqxH9UkX43dRaOOsa5cyTO0LKB9WbozPifuVyANNdMqpldfvAlSttRxWiOqFluo6sZQfQtWYK0fKwTJ9Y4rfMTb0S6ju3yjMd1YN6dFFslCRXzQFUsSqLsgYsnRRdma06cN31kxCG8FjLWLsrURaAZQZUZYRPjS0h_Z1mPvifameD14G_iFS1-uIBjmJbcJc.ad6lMLt1fObyDUrtf0rI-YRwVmGkhj7PENv0JhtN8o4&sr=8-3&rrid=SXWSH3Q8XQQHR7S4P8T1&experienceId=aodAjaxMain`;

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

getPrices("B0CQBL6RJ6");

//https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=msi%252Braider%252Bge68%25252Caps%25252C489&crid=2MSAVFWB9JAG5&keywords=msi%252Braider%252Bge68&dib_tag=se&dib=eyJ2IjoiMSJ9.Fv5_k7n5MkHIisvuByTr0AQL3b2EsElp9PbcP_YNyVnFqxH9UkX43dRaOOsa5cyTO0LKB9WbozPifuVyANNdMqpldfvAlSttRxWiOqFluo6sZQfQtWYK0fKwTJ9Y4rfMTb0S6ju3yjMd1YN6dFFslCRXzQFUsSqLsgYsnRRdma06cN31kxCG8FjLWLsrURaAZQZUZYRPjS0h_Z1mPvifameD14G_iFS1-uIBjmJbcJc.ad6lMLt1fObyDUrtf0rI-YRwVmGkhj7PENv0JhtN8o4&sr=8-3&rrid=SXWSH3Q8XQQHR7S4P8T1&experienceId=aodAjaxMain