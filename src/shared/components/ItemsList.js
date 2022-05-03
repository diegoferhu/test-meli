import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function ItemsList({ fetchInitialData, data }) {
  let [searchParams] = useSearchParams();
  const [response, setResponse] = React.useState(() => {
    return __isBrowser__ ? window.__INITIAL_DATA__ : data;
  });

  const [loading, setLoading] = React.useState(response ? false : true);

  const fetchNewsItems = React.useRef(response ? false : true);

  const id = searchParams.get("search");

  React.useEffect(() => {
    if (fetchNewsItems.current === true) {
      setLoading(true);

      fetchInitialData(id).then((response) => {
        setResponse(response);
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
      {response.items.map((item) => (
        <div key={`item-${item.id}`}>
          <NavLink to={`/items/${item.id}`} className="item-list">
            <div className="item-list__image">
              <img
                src={item.picture}
                className=""
                alt={item.title}
                width="180"
                height="180"
              />
            </div>
            <div className="item-list__details">
              <div className="header">
                <p className="price">{item.price.amount}</p>
                <p>item.category</p>
              </div>
              <div className="body">
                <p>{item.title}</p>
              </div>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
}
