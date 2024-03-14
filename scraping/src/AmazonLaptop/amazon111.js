const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&rnid=2528832011&s=electronics&sprefix=laptop%25252Caps%25252C411&crid=9K5UOIO92S93&keywords=laptop&dib_tag=se&dib=eyJ2IjoiMSJ9.eBHwl0MhKGrJpj3PoVGN57IncrWexNbzHaZPersrViGvB2OWFxERaVj80uNQN2UYbOKH4DJwzexSQMMWjdeGDx0znfQcY7u3YZ9EMWTQs35cIp0g2DDabJYYkLMHM0kqXfk07sdbtC2LYe6DiOEIEiUeOlMpYG9tdwzV9CBGQfucmnG2LgKNPySNu3CHeqOfniJsGYWoN0MycRT-rV0hAQQe6sjD3ryjgmhhkyQ5GjRrCylxDaWMzUKAUm1OOXensCzYZ9ZHNJFEQL_T4SSsHoCVvv8-qldqWPQBcfzeAws.fuEjq6_xRLkXe-sCENFB502y_6OnWKBPOkI6_2EXuy4&refinements=p_89%25253ADell&sr=1-1&rrid=3VGVDPQK6A3YAM33277C&experienceId=aodAjaxMain`;

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
https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=hp%252Bcgrome%25252Caps%25252C349&crid=2QBGAHS63N7LK&keywords=hp%252Bchromebook&dib_tag=se&dib=eyJ2IjoiMSJ9.JFk-uVAGKTlG8cFVNIJ6KP1nYpAk94_SHFFkYGRc_PMOi6kF-7yz31RLMaaxTvINMlMEyLqBqv9cpVrLhH4IM3sLY3Pi14jQpGlq_HODfoXDSHzvGlKE_FSJ2wXTe8H-9aYd2WUWz6Co1XvjfGfTnhf9RPHQmWXrh8vY2x2uoZQbJOvvfvZMoZEYbWnUVmGRyZLCndi1pGFIt1KDHAW942DRJyuas7d0IjdyLe26GI4.omhvCnQZKOvTHWOSMDdQoN4b7paaOiPOeukbtlugni8&sr=8-4&rrid=VB5XT2F24BF3CSVE0XW9&experienceId=aodAjaxMain


getPrices("B08BC2QQ2M")
