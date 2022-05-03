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
        category: items.filters[0].values[0].name,
        bredcrumb: items.filters[0].values[0].path_from_root
          .map((category) => category["name"])
          .join(" > "),
      };
      return response;
    })
    .catch((error) => {
      console.warn(error);
      return null;
    });
}

export function fetchItemDetails(id) {
  const itemDetails = requestItemDetail(id);
  const description = requestItemDescription(id);

  return Promise.all([itemDetails, description]).then((responseMeliApi) => {
    const response = {
      author: signApi,
      item: {
        id: responseMeliApi[0].id,
        title: responseMeliApi[0].title,
        price: {
          currency: responseMeliApi[0].currency_id,
          amount: responseMeliApi[0].price,
          decimals: 0,
        },
        picture: responseMeliApi[0].pictures[0].secure_url,
        condition: responseMeliApi[0].condition === "new" ? "Nuevo" : "Usado",
        free_shipping: responseMeliApi[0].shipping.free_shipping,
        sold_quantity: responseMeliApi[0].sold_quantity,
        description: responseMeliApi[1].plain_text,
      },
    };
    return response;
  });
}

function requestItemDetail(id) {
  const encodedURI = encodeURI(`https://api.mercadolibre.com/items/${id}`);

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((item) => item)
    .catch((error) => {
      console.warn(error);
      return null;
    });
}

function requestItemDescription(id) {
  const encodedURI = encodeURI(
    `https://api.mercadolibre.com/items/${id}/description`
  );

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((item) => item)
    .catch((error) => {
      console.warn(error);
      return null;
    });
}
