import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Flowbite } from "flowbite-react";
import LoginPage from "./views/LoginPage";
import Dashboard from "./views/Dashboard";
import NavbarComp from "./views/Navbar";
import Wallets from "./views/Wallets";
import Spending from "./views/Spending";

function App() {

  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <>
      <Flowbite>
        <NavbarComp />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/wallets" element={isAuth ? <Wallets /> : <Navigate to="/" />} />
          <Route path="/spending" element={isAuth ? <Spending /> : <Navigate to="/" />} />
        </Routes>
      </Flowbite>
    </>
  );
}

export default App;
