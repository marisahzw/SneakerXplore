const axios = require('axios');
const cheerio = require('cheerio');

// Function to fetch and scrape data
async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const scrapedProducts = [];

      $('li').each((index, element) => {
        const itemName = $(element).find('h3').text().toString();
        if (itemName) {
          const itemPrice = $(element).find('div.relative.flex.mobile\\:flex-col.w-full.items-start > div.flex.flex-col.flex-none.mobile\\:items-start.items-end.text-sm.md\\:text-base.mobile\\:mt-2 > span').text().trim();
          scrapedProducts.push({ name: itemName, price: itemPrice });
        }
      });

      return scrapedProducts;
    } else {
      throw new Error(`Failed to retrieve data. Status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

module.exports = scrapeWebsite;
