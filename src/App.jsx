import { useState } from "react";
import FloatingWhatsApp from "./componets/FloatingWhatsApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./router/router";
import "./App.css";

function App() {
  return (
    <>
      <Router />

      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      <FloatingWhatsApp />
    </>
  );
}

export default App;
