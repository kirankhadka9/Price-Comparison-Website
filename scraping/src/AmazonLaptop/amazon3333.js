const axios = require("axios");
const { JSDOM } = require("jsdom");

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=dell%252B5420%252Blaptop%25252Caps%25252C331&crid=65EZDFTOUAMS&keywords=dell%252B5420%252Blaptop&dib_tag=se&dib=eyJ2IjoiMSJ9.qOcYrdkAA4ldW_-AxVJ9gCymEhK6RupyjsV8emOxfK6PCXQtvd6PV3Z_KKcVDuLRDT-b6Z7PpTF-NTdQDbuzvT6nukhQ1MesEMma32adG13lGUmrV8d8lKW3tllLY3g-oBHgIp8so10cSi27PSK6VoaBq9aQJ8BcCK6GAWVh7nK5Nvp80BeO1Ws_Hm2Eqf-_-Bt9idpWwWVmlQ_Hy7_9eWSrG-IL7kBrLuhQj3WNMCY.pUsbWWVwodPXFQNcTS-QfYezqtFDFgxEJJZYDQ64Fjw&sr=8-2&rrid=RCMJ5M38VQ80YXA75HX8&experienceId=aodAjaxMain`;

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

getPrices("B09GPT1GP1");

//https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=dell%252B5420%252Blaptop%25252Caps%25252C331&crid=65EZDFTOUAMS&keywords=dell%252B5420%252Blaptop&dib_tag=se&dib=eyJ2IjoiMSJ9.qOcYrdkAA4ldW_-AxVJ9gCymEhK6RupyjsV8emOxfK6PCXQtvd6PV3Z_KKcVDuLRDT-b6Z7PpTF-NTdQDbuzvT6nukhQ1MesEMma32adG13lGUmrV8d8lKW3tllLY3g-oBHgIp8so10cSi27PSK6VoaBq9aQJ8BcCK6GAWVh7nK5Nvp80BeO1Ws_Hm2Eqf-_-Bt9idpWwWVmlQ_Hy7_9eWSrG-IL7kBrLuhQj3WNMCY.pUsbWWVwodPXFQNcTS-QfYezqtFDFgxEJJZYDQ64Fjw&sr=8-2&rrid=RCMJ5M38VQ80YXA75HX8&experienceId=aodAjaxMain
