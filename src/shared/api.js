import fetch from "isomorphic-fetch";

export function fetchItems(item) {
  console.log("fetchItems", item);
  const encodedURI = encodeURI(
    `https://api.mercadolibre.com/sites/MLA/search?q=:${item}&limit=4`
  );

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((items) => {
      const size = 4;
      items = items.results.slice(0, size);
      return items;
    })
    .catch((error) => {
      console.warn(error);
      return null;
    });
}
