import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

const Home = lazy(() => import("./screens/Home"));
const CreateJob = lazy(() => import("./screens/CreateJob"));
const Login = lazy(() => import("./screens/Login"));
const Register = lazy(() => import("./screens/Register"));
const AccountSettings = lazy(() => import("./screens/AccountSettings"));
const NotFound = lazy(() => import("./screens/NotFound"));
const Workspace = lazy(() => import("./screens/workspace/Main"));
const CreateAction = lazy(() => import("./screens/dev/CreateAction"));
const EditAction = lazy(() => import("./screens/dev/EditAction"));
export default function App() {
  return (
    <Router>
      <Provider store={store}>
        <Suspense
          fallback={<div className="bg-brand-primary min-h-screen"></div>}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/createjob" element={<CreateJob />} />
            <Route path="/create-action" element={<CreateAction />} />
            <Route path="/edit-action" element={<EditAction />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/accountsettings" element={<AccountSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Provider>
    </Router>
  );
}
