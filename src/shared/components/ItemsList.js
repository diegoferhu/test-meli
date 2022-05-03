import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function ItemsList({ fetchInitialData, data }) {
  let [searchParams] = useSearchParams();
  const [items, setItems] = React.useState(() => {
    return __isBrowser__ ? window.__INITIAL_DATA__ : data;
  });

  const [loading, setLoading] = React.useState(items ? false : true);

  const fetchNewsItems = React.useRef(items ? false : true);

  const id = searchParams.get("search");

  React.useEffect(() => {
    if (fetchNewsItems.current === true) {
      setLoading(true);

      fetchInitialData(id).then((items) => {
        setItems(items);
        setLoading(false);
      });
    } else {
      fetchNewsItems.current = true;
    }
  }, [id, fetchNewsItems]);

  if (loading === true) {
    return <i className="loading">?????</i>;
  }
  return (
    <div className="items-list">
      {items.map((item) => (
        <div key={`item-${item.id}`}>
          <NavLink to={`/items/${item.id}`}>
            <div>
              <p>{item.thumbnail}</p>
            </div>
            <div>
              <p>{item.price}</p>
              <p>{item.title}</p>
              <p>------------</p>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
}
