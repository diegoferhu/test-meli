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

  if (loading === true) {
    return <i className="loading">🤹‍♂️</i>;
  }
  return <h2>Item Details</h2>;
}
