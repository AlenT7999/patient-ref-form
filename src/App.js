// import logo from './logo.svg';
import "./App.css";
import PatientRef from "./components/PatientRef";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<PatientRef />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
