const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=acer%252Baspire%252Bvero%252B1355%25252Caps%25252C729&crid=762DJZ5YM873&keywords=acer%252Baspire%252Bvero%252Bintel%252Bi7-1355u&dib_tag=se&dib=eyJ2IjoiMSJ9.po4uF_u21mOAykluRFhc_uY3_lgPcjgndNOrBV0X5wYjaOwxWMPubbdRWKtJmB6vEo-JXTbiPfK0X-EyLGTD72ZPj3J8xECS3rOislyy82NTy_feyWr0UeTN6Jg_xKu9Zh-gXT5LwP76QLLMe09EeZPbSFSISPu_vTiXx8SBf3Uiutlv9vNaqjoJnhZQgAyaq62xiFNO7aO74JJxb22Na-i9R_Cc8ElydUWoVg86z_4.M6IK4E1hz4TAbUpkCm9AvFYw8Bn2gN-_UgCWT8YkJyE&sr=8-2&rrid=42MW67B5DDKYZJ12442M&experienceId=aodAjaxMain`;

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

getPrices("B0CX53LKPY");

//https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=acer%252Baspire%252Bvero%252B1355%25252Caps%25252C729&crid=762DJZ5YM873&keywords=acer%252Baspire%252Bvero%252Bintel%252Bi7-1355u&dib_tag=se&dib=eyJ2IjoiMSJ9.po4uF_u21mOAykluRFhc_uY3_lgPcjgndNOrBV0X5wYjaOwxWMPubbdRWKtJmB6vEo-JXTbiPfK0X-EyLGTD72ZPj3J8xECS3rOislyy82NTy_feyWr0UeTN6Jg_xKu9Zh-gXT5LwP76QLLMe09EeZPbSFSISPu_vTiXx8SBf3Uiutlv9vNaqjoJnhZQgAyaq62xiFNO7aO74JJxb22Na-i9R_Cc8ElydUWoVg86z_4.M6IK4E1hz4TAbUpkCm9AvFYw8Bn2gN-_UgCWT8YkJyE&sr=8-2&rrid=42MW67B5DDKYZJ12442M&experienceId=aodAjaxMain