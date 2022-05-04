import * as React from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

export default function ItemDetails({ fetchInitialData, data }) {
  const [details, setDetails] = React.useState(() => {
    return __isBrowser__ ? window.__INITIAL_DATA__ : data;
  });

  const [loading, setLoading] = React.useState(details ? false : true);

  const fetchNewDetails = React.useRef(details ? false : true);

  const { id } = useParams();

  React.useEffect(() => {
    if (fetchNewDetails.current === true) {
      setLoading(true);

      fetchInitialData(id).then((details) => {
        setDetails(details);
        setLoading(false);
      });
    } else {
      fetchNewDetails.current = true;
    }
  }, [id, fetchNewDetails]);

  if (loading === true) {
    return <Loader />;
  }
  return (
    <div className="item">
      <div className="item__main">
        <div className="item__image">
          <img src={details.item.picture} alt={details.item.title} />
        </div>
        <div className="item__info">
          <div className="body">
            <p>
              {details.item.condition} - {details.item.sold_quantity} vendidos
            </p>
            <h1>{details.item.title}</h1>
            <p className="price">{details.item.price.amount}</p>
            <button>Comprar</button>
          </div>
        </div>
      </div>
      <div className="item__description">
        <p>{details.item.description}</p>
      </div>
    </div>
  );
}
