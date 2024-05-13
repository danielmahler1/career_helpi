import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import BasicQuestion from "./Pages/BasicQuestion";
import DetailedQuestion from "./Pages/DetailedQuestion";
import Results from "./Pages/Results";
import AboutUs from "./Pages/AboutUs";
import { ToastContainer } from "react-toastify";
import FloatingBottomNav from "./Components/FloatingBottomNav";
import "./Styles/App.css";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/basic-questions" element={<BasicQuestion />} />
          <Route path="/detailed-questions" element={<DetailedQuestion />} />
          <Route path="/results" element={<Results />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        <FloatingBottomNav />
      </div>
    </Router>
  );
};

export default App;
