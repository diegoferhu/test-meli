import * as React from "react";
import { useParams } from "react-router-dom";

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
  console.log("details", details);
  if (loading === true) {
    return <i className="loading">🤹‍♂️</i>;
  }
  return (
    <div className="item">
      <div className="item__main">
        <div className="item__image">
          <img src={details.pictures[0].secure_url} alt={details.title} />
        </div>
        <div className="item__info">
          <h1>{details.title}</h1>
          <p>{details.price}</p>
          <p>{details.warranty}</p>
        </div>
      </div>
      <div className="item__description">
        <p>details.description</p>
      </div>
    </div>
  );
}
