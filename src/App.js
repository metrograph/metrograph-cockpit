import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

const Home = lazy(() => import("./screens/Home"));
const CreateJob = lazy(() => import("./screens/CreateJob"));
const Login = lazy(() => import("./screens/dev/Mylogin"));
const Workspace = lazy(() => import("./screens/workspace/Main"));
const Register = lazy(() => import("./screens/Register"));
const AccountSettings = lazy(() => import("./screens/AccountSettings"));
const Action = lazy(() => import("./screens/dev/Action"));
const NotFound = lazy(() => import("./screens/NotFound"));
const CreateAction = lazy(() => import("./screens/dev/CreateAction"));
const EditAction = lazy(() => import("./screens/dev/EditAction"));
const Settings = lazy(() => import("./screens/dev/Settings"));

export default function App() {
  return (
    <Router>
      <Provider store={store}>
        <Suspense
          fallback={<div className="bg-brand-primary min-h-screen"></div>}
        >
          <Routes>
            <Route path="/" element={<Action />} />
            <Route path="/action" element={<Action />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/create-action" element={<CreateAction />} />
            <Route path="/edit-action/:uuid" element={<EditAction />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />

            {/* <Route path="/createjob" element={<CreateJob />} />
            <Route path="/accountsettings" element={<AccountSettings />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workspace" element={<Workspace />} /> */}
            
          </Routes>
        </Suspense>
      </Provider>
    </Router>
  );
}
