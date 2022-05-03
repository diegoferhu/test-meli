import Home from "./components/Home";
import ItemsList from "./components/ItemsList";
import { fetchItems } from "./api";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/items",
    component: ItemsList,
    fetchInitialData: (path = "") => {
      console.log("fetching items", path);
      return fetchItems(path.split("=").pop());
    },
  },
];

export default routes;
