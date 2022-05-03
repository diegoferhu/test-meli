import Home from "./components/Home";
import ItemsList from "./components/ItemsList";
import ItemDetails from "./components/ItemDetails";
import { fetchItems, fetchItemDetails } from "./api";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/items",
    component: ItemsList,
    fetchInitialData: (path = "") => {
      return fetchItems(path.split("=").pop());
    },
  },
  {
    path: "/items/:id",
    component: ItemDetails,
    fetchInitialData: (path = "") => {
      return fetchItemDetails(path.split("/").pop());
    },
  },
];

export default routes;
