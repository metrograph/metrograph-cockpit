import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const Login = lazy(() => import("./screens/Login"));
const Register = lazy(() => import("./screens/Register"));
const Action = lazy(() => import("./screens/Action"));
const CreateAction = lazy(() => import("./screens/CreateAction"));
const EditAction = lazy(() => import("./screens/EditAction"));
const Settings = lazy(() => import("./screens/Settings"));

export default function App() {
  return (
    <Router>
      <Provider store={store}>
        <Suspense fallback={<div className="bg-black min-h-screen"></div>}>
          <Routes>
            <Route path="/" element={<Action />} />
            <Route path="*" element={<Action />} />
            <Route path="/action" element={<Action />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/create-action" element={<CreateAction />} />
            <Route path="/edit-action/:uuid" element={<EditAction />} />
          </Routes>
        </Suspense>
      </Provider>
    </Router>
  );
}
