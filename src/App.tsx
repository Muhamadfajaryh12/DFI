import "./App.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import dashboardPage from "./pages/dashboardPage";
import ProfilePage from "./pages/ProfilePage";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import EmployePage from "./pages/EmployePage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={LoginPage} />
          <Route path="/profile" Component={ProfilePage} />
          <Route path="/dashboard" Component={dashboardPage} />
          <Route path="/category" Component={CategoryPage} />
          <Route path="/employee" Component={EmployePage} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
