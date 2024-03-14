const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=acer%252Baspire%252B3%25252Caps%25252C349&crid=QT3S9KZ6UHKL&keywords=acer%252Baspire%252B3&dib_tag=se&dib=eyJ2IjoiMSJ9.K3j5Elg5jkKMgwuUz_ieXKbclAgn3M8k3F4I19WZBbVBuqSBUXkio3nVoNr3yxBkKThVihJ_71jnBqDkCnrbJ887WgEHCMolLno_pWaX84n_NVa-VCcGhXNiyVN4rdJMlssdup5Uwk-latq6kfOt0ThdSAankiW2Mq7CVIS1QOYHOdHlQDekOomonK_xpeuCTkL5y-TSMsV3DaCTYTuuHMbCCE--ArqAJSf3vJvuV2A.lRTRTm-n_wwgWgUHrQm7Bh9xlBSK_VcVmQBXNm3dKjE&sr=8-1&rrid=1FNQHQY66WYZHYEVQZJG&experienceId=aodAjaxMain`;

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
    pinnedElement: $("#aod-asin-title").textContent.trim(),
    price,
    pinnedShippedFrom,
   image
  };

  console.log(result);
}

getPrices("B0CBP5SYTX");
//https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=acer%252Baspire%252B3%25252Caps%25252C349&crid=QT3S9KZ6UHKL&keywords=acer%252Baspire%252B3&dib_tag=se&dib=eyJ2IjoiMSJ9.K3j5Elg5jkKMgwuUz_ieXKbclAgn3M8k3F4I19WZBbVBuqSBUXkio3nVoNr3yxBkKThVihJ_71jnBqDkCnrbJ887WgEHCMolLno_pWaX84n_NVa-VCcGhXNiyVN4rdJMlssdup5Uwk-latq6kfOt0ThdSAankiW2Mq7CVIS1QOYHOdHlQDekOomonK_xpeuCTkL5y-TSMsV3DaCTYTuuHMbCCE--ArqAJSf3vJvuV2A.lRTRTm-n_wwgWgUHrQm7Bh9xlBSK_VcVmQBXNm3dKjE&sr=8-1&rrid=1FNQHQY66WYZHYEVQZJG&experienceId=aodAjaxMain
