import { BrowserRouter as Router } from "react-router-dom";
import ApplicationRouter from "./assets/components/ApplicationRouter";
import "./assets/styles/GlobalStyles.css";
import "./App.css";


export default function App() {
  return (
    <Router>
      <div className="app">
        <ApplicationRouter />
      </div>
    </Router>
  );
}
