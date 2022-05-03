import fetch from "isomorphic-fetch";
const signApi = {
  name: "Diego",
  lastname: "Hurtado",
};

export function fetchItems(item) {
  const encodedURI = encodeURI(
    `https://api.mercadolibre.com/sites/MLA/search?q=:${item}&limit=4`
  );

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((items) => {
      const maxAmountItems = 4;
      const response = {
        author: signApi,
        items: items.results.slice(0, maxAmountItems).map((item) => ({
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: item.price,
            decimals: 0,
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
        })),
      };
      return response;
    })
    .catch((error) => {
      console.warn(error);
      return null;
    });
}

export function fetchItemDetails(id) {
  const encodedURI = encodeURI(`https://api.mercadolibre.com/items/${id}`);

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((details) => {
      console.log("details", details);
      return details;
    })
    .catch((error) => {
      console.warn(error);
      return null;
    });
}
