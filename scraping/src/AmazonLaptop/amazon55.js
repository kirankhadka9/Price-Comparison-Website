const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=microsoft%252Blapto%25252Caps%25252C438&crid=1O9ASVZDTHLSU&keywords=microsoft%252Blaptop&dib_tag=se&dib=eyJ2IjoiMSJ9.WZegARNoksvbpvk7_owVMcPz8pFAqAZhBgjQBwU9P2ecXre-tguPIrUwYXzF202gogDVcjbkv2NrRsXoamh45-kx7ajBKqjbf2fockdHxa5OeZM73_e2d9fGpZHBSNeHAOmPggiHNkQFzlNMOowoil-5zpqXQV5t_T8C5DNSr-ZfRjRgSYoVBGEArjxkRMVDoMYNxDNmdn1PieZ3952JlPdv7CkcWKEbJNwKhIU6iX8.6ioQorr9RqoNa5wFTpLPFlAf7rDpL-twqGz8srfP0jI&sr=8-2&rrid=JHTGZ73MSDQXSEXWZFAH&experienceId=aodAjaxMain`;

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
  // console.log(result.pinnedElement);
  // console.log(price);
  // console.log(pinnedShippedFrom);
  module.exports=result;
 console.log(result);
}

getPrices("B0CMZKZ1KF");
