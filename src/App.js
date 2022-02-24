import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";
//const Learn = lazy(() => import("./screens/Learn"));
const Home = lazy(() => import("./screens/Home"));
const CreateJob = lazy(() => import("./screens/CreateJob"));



export default function App() {

  return (
    <Router>
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* <Route path="/" element={<Learn />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/createjob" element={<CreateJob />} />
          </Routes>
        </Suspense>
      </Provider>
    </Router>
  );
}
