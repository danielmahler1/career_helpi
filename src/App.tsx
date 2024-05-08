import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import BasicQuestion from "./Pages/BasicQuestion";
import DetailedQuestion from "./Pages/DetailedQuestion";
import Results from "./Pages/Results";
import { ToastContainer } from "react-toastify";
import FloatingBottomNav from "./Components/FloatingBottomNav";
import AboutUs from "./Pages/AboutUs";
import "./Styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/starter_helpi/" replace />} />
          <Route path="/starter_helpi/" element={<HomePage />} />
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
