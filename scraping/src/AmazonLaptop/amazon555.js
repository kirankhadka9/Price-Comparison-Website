const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&rnid=2528832011&s=electronics&sprefix=microsoft%252Blaptop%252Bgo%252B3%25252Caps%25252C394&crid=297GT8P3WNW7H&keywords=microsoft%252Blaptop%252Bgo%252B3&dib_tag=se&dib=eyJ2IjoiMSJ9.5wMvscO6AT7VM6FKczbVOdjuxHYxoOkSXdrQ15MYGwk76cS4mO_DWot9Gt-yJp9rPMHsuaxIT04whS7UNO1IH9kQYKG1vltmMf9lEFnylC9fmBETEL75vJvZsNWTL4X2BdT9eO7vChwNVmNnaK_bFbISnzY11YrY6VO0Xkfa_GCGjwau3J73G9F_gXMZ8kgm9KF4h0kGA1IY9ZSJ5VdX1N3rm2hYI_MyW2jcya08c6v0Cp7rICSFpDl-4_FCypxB4sDMZW7_OcLRuDhU1X7fRRgn-iR8jOD3hoJsMgJyuZ4.9befuP9yAZ022dmanaseU4iI5QCj3ZtksOzzyXj5Q6Q&refinements=p_89%25253AMicrosoft&sr=1-12&rrid=J4TVKH0JCP8XJF5M1VCG&experienceId=aodAjaxMain`;

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

getPrices("B0C5MSCNSB");

//https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&rnid=2528832011&s=electronics&sprefix=microsoft%252Blaptop%252Bgo%252B3%25252Caps%25252C394&crid=297GT8P3WNW7H&keywords=microsoft%252Blaptop%252Bgo%252B3&dib_tag=se&dib=eyJ2IjoiMSJ9.5wMvscO6AT7VM6FKczbVOdjuxHYxoOkSXdrQ15MYGwk76cS4mO_DWot9Gt-yJp9rPMHsuaxIT04whS7UNO1IH9kQYKG1vltmMf9lEFnylC9fmBETEL75vJvZsNWTL4X2BdT9eO7vChwNVmNnaK_bFbISnzY11YrY6VO0Xkfa_GCGjwau3J73G9F_gXMZ8kgm9KF4h0kGA1IY9ZSJ5VdX1N3rm2hYI_MyW2jcya08c6v0Cp7rICSFpDl-4_FCypxB4sDMZW7_OcLRuDhU1X7fRRgn-iR8jOD3hoJsMgJyuZ4.9befuP9yAZ022dmanaseU4iI5QCj3ZtksOzzyXj5Q6Q&refinements=p_89%25253AMicrosoft&sr=1-12&rrid=J4TVKH0JCP8XJF5M1VCG&experienceId=aodAjaxMain