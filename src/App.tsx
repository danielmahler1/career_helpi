import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import BasicQuestion from "./Pages/BasicQuestion";
import DetailedQuestion from "./Pages/DetailedQuestion";
import { ToastContainer, toast } from "react-toastify";
import "../src/Styles/output.css";

const App = () => {
  const saveKeyData = "MYKEY";
  const [key, setKey] = useState<string>(localStorage.getItem(saveKeyData) || "");
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (key.trim() === "") {
      toast.error("API Key Cannot Be Empty");
      return;
    }
    localStorage.setItem(saveKeyData, key);
    toast.success("API Key Saved Successfully");
  }
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/starter_helpi/" replace />} />
          <Route path="/starter_helpi/" element={<HomePage keyData={key} setKey={setKey} handleSubmit={handleSubmit} changeKey={changeKey} />} />
          <Route path="/basic-questions" element={<BasicQuestion />} />
          <Route path="/detailed-questions" element={<DetailedQuestion />} />
        </Routes>
        <Footer keyData={key} handleSubmit={handleSubmit} changeKey={changeKey} />
      </div>
    </Router>
  );
};

export default App;
