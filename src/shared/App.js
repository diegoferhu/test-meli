import * as React from "react";
import routes from "./routes";
import { Route, Routes } from "react-router-dom";
import NoMatch from "./components/NoMatch";
import "./styles.css";
import Header from "./components/Header";
import Layout from "./components/Layout";

export default function App({ serverData = null }) {
  return (
    <React.Fragment>
      <div className="container">
        <Layout>
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
        </Layout>
      </div>
    </React.Fragment>
  );
}
