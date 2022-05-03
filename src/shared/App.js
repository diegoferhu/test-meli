import * as React from "react";
import routes from "./routes";
import { Route, Routes } from "react-router-dom";
import NoMatch from "./components/NoMatch";
import "./styles.css";

export default function App({ serverData = null }) {
  return (
    <React.Fragment>
      <div className="container">
        <Routes>
          {routes.map(({ path, fetchInitialData, component: C }) => (
            <Route
              key={path}
              path={path}
              element={
                <C data={serverData} fetchInitialData={fetchInitialData} />
              }
            />
          ))}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}
