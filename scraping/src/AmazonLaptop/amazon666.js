
const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
`https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=acer%252Bsw%25252Caps%25252C2239&crid=WNJEROBGM8M9&keywords=acer%252Bswift%252B3%252B14&dib_tag=se&dib=eyJ2IjoiMSJ9.TYxWKDFOxFkE7D0KZfglcrFU27hsYy6kNoCkX_ycIXs7DgD6svXM4_gKrnma2e7k1VBf-muGzr26JV6OPrLd5eJAZbzHDYS2JFcVewy75h3j6gDJvNULeM5BOrlb2tlgX_YJ9s1colwDxS-ii6LJPf5p776JdkvD3Spla9pphI9dN_k0AABVnywmDBnnPunWIsbNeuzXGZwGiiD5iPN9UshfImim-KXoimZ1r1FzUzI.rmYlg5mOPRBRYDACxVmoteilyIz-drPIhEr540ynok4&sr=8-1&rrid=EX2A64G3MWWNVB4EHBM6&experienceId=aodAjaxMain`
async function getPrices(product_id) {
  const productUrl = getProductUrl(product_id);
  const { data } = await axios.get(productUrl, {
    headers: {  
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8",
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



getPrices("B08JQJ5RKK")
//https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=acer%252Bsw%25252Caps%25252C2239&crid=WNJEROBGM8M9&keywords=acer%252Bswift%252B3%252B14&dib_tag=se&dib=eyJ2IjoiMSJ9.TYxWKDFOxFkE7D0KZfglcrFU27hsYy6kNoCkX_ycIXs7DgD6svXM4_gKrnma2e7k1VBf-muGzr26JV6OPrLd5eJAZbzHDYS2JFcVewy75h3j6gDJvNULeM5BOrlb2tlgX_YJ9s1colwDxS-ii6LJPf5p776JdkvD3Spla9pphI9dN_k0AABVnywmDBnnPunWIsbNeuzXGZwGiiD5iPN9UshfImim-KXoimZ1r1FzUzI.rmYlg5mOPRBRYDACxVmoteilyIz-drPIhEr540ynok4&sr=8-1&rrid=EX2A64G3MWWNVB4EHBM6&experienceId=aodAjaxMain