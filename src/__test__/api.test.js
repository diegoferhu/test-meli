import "@babel/polyfill";

import { fetchItems } from "../shared/api";
import fetch from "isomorphic-fetch";

const mockResultFetch = {
  results: [
    {
      id: "1FromMock",
      title: "title",
      currency_id: "USD",
      price: 1000,
      thumbnail: "http://url.com",
      condition: "new",
      shipping: {
        free_shipping: true,
      },
    },
  ],
  filters: [],
};

jest.mock("isomorphic-fetch", () =>
  jest.fn().mockReturnValue(
    Promise.resolve({
      json: () => Promise.resolve(mockResultFetch),
    })
  )
);

describe("fetchItems", () => {
  test("should return an array of items", async () => {
    const items = await fetchItems();
    expect(items.id).toBe(mockResultFetch.id);
  });
});
