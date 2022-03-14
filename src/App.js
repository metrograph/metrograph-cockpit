import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

const Home = lazy(() => import("./screens/Home"));
const CreateJob = lazy(() => import("./screens/CreateJob"));
const Login = lazy(() => import("./screens/Login"))



export default function App() {

  return (
    <Router>
      <Provider store={store}>
        <Suspense fallback={<div className="bg-brand-primary min-h-screen"></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createjob" element={<CreateJob />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </Provider>
    </Router>
  );
}
