const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&s=pc&keywords=hp%252Belitebook%252Bg5&dib_tag=se&dib=eyJ2IjoiMSJ9.KYGnf0J4R_u_SZCiH7UCtyj_l4pJ7GwojXBWsYmO3q5cazMJFi4u3noccrWfntqtdMh8ZFHWyOLUdB7aqkZLtwwYk9I--67P7jQkqNj-Qhqknrl_0S01kx8TUbyEc0kdBBUYNYyU0pOO4Nua775xFtOi3l3kkcQGzaGVc9DXrd4ovl89coXQDjfrZztJLlGPMVC-QgDKFfdTDBlzURodBXxtzRydx6WWq_CL1ugtQVGmWXZJizqWCMI5SvmBSUqtEHp005U43YULykYXMQag0TKDPL9VV35ulYfX0I2v_KE.2AghjQt1FddVQaszNSzI7WPGqup5M81wQyC1LKSwnA0&sr=1-1&rrid=QWQWP5SK4MBFD8G1HZWQ&experienceId=aodAjaxMain`;
  

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



getPrices("B07SZHZ32H")
