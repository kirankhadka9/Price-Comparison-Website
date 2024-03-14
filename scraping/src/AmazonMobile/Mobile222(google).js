//Google Pixel 7 Pro 5G
const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
`https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=google%252Bpixel%252B7%252Bpro%25252Caps%25252C381&crid=2N6L2G85S01RA&keywords=google%252Bpixel%252B7%252Bpro&dib_tag=se&dib=eyJ2IjoiMSJ9.i-2d3fRwpV7qG8rWYBgoyvy1GYgoLHRxX3a_UwFavzGm1-DDPOY7RIOjd5UoP2EZ9cCtO_VvbXi0sv9Yvcjzz4O-bF2Ta23XQgwGdRt-LVAIpeF1MMR59zNSIk0GHSPcu6IXzBA7OMKmTDj9l9-oC3QfmVkevr5KFsZC8LDuiyrZFf7qAjmm2pNBlUIr5eP30S1zymTSUnXEulRY8myPwEkreXOOHO-YyyqIte3PXzQ.CEkxuQzndWes93GozN711_Bkq8FDrb--iPpzVqRi93g&rrid=PEY55C7BGE9MAA1BPED3&experienceId=aodAjaxMain`

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

getPrices("B0BJL8D6G5");
