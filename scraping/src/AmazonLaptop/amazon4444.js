const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=msi%252Bsummi%25252Caps%25252C391&crid=1MLS6HYUWQPGQ&keywords=msi%252Bsummit&dib_tag=se&dib=eyJ2IjoiMSJ9.VOBlY-ImNsHlJuqWApcNtaR911P8w3aDwrpggVjNTj_LaoQGWnqfvEHLbhbATriVUIAlZ-sN42AqrUxz63m8c0gRQb97VpvzZym6ijEdVis75EDBEt3nDcngERR6wSDUNooNDAh-Pgk64t9Qonty6ebh0VzmAoeR7lWrBSMpPTAk9OPYI6v0R-JeEyN9HfqWyBmBiFCQuN_JxcTdBEyOcADoYVdrF0mD2Zy6QIfwKH4.492v6FsUfSms6Vh65fUd5upTmfNwERA5XOYCQTuNq40&sr=8-2&rrid=CMQA2STHN2QXVBGHZRP0&experienceId=aodAjaxMain`;

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

getPrices("B09ST34QKJ");

// n.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=msi%252Bsummi%25252Caps%25252C391&crid=1MLS6HYUWQPGQ&keywords=msi%252Bsummit&dib_tag=se&dib=eyJ2IjoiMSJ9.VOBlY-ImNsHlJuqWApcNtaR911P8w3aDwrpggVjNTj_LaoQGWnqfvEHLbhbATriVUIAlZ-sN42AqrUxz63m8c0gRQb97VpvzZym6ijEdVis75EDBEt3nDcngERR6wSDUNooNDAh-Pgk64t9Qonty6ebh0VzmAoeR7lWrBSMpPTAk9OPYI6v0R-JeEyN9HfqWyBmBiFCQuN_JxcTdBEyOcADoYVdrF0mD2Zy6QIfwKH4.492v6FsUfSms6Vh65fUd5upTmfNwERA5XOYCQTuNq40&sr=8-2&rrid=CMQA2STHN2QXVBGHZRP0&experienceId=aodAjaxMainhttps://www.amazo