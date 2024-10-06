export const urlConstants = {
  BASE_URL: 'https://api.slikk.club/',
  PRODUCTS_URL: (page: number = 1) =>
    `search/product?p=${page}&page_size=10&company_id=2`,
};
