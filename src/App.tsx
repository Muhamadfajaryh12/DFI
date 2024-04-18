import "./App.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import dashboardPage from "./pages/dashboardPage";
import ProfilePage from "./pages/ProfilePage";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import EmployePage from "./pages/EmployePage";
import MasterProductPage from "./pages/product/MasterProductPage";
import ItemProductPage from "./pages/product/ItemProductPage";
import TaskProductPage from "./pages/product/TaskProductPage";
import PatrolProductPage from "./pages/product/PatrolProductPage";
import MasterLocationPage from "./pages/location/MasterLocationPage";
import ItemLocationPage from "./pages/location/ItemLocationPage";
import TaskLocationPage from "./pages/location/TaskLocationPage";
import PatrolLocationPage from "./pages/location/PatrolLocationPage";
import NotFoundPage from "./pages/NotFoundPage";
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
          <Route path="/product/master" Component={MasterProductPage} />
          <Route path="/product/item" Component={ItemProductPage} />
          <Route path="/product/task" Component={TaskProductPage} />
          <Route path="/product/patrol" Component={PatrolProductPage} />
          <Route path="/location/master" Component={MasterLocationPage} />
          <Route path="/location/item" Component={ItemLocationPage} />
          <Route path="/location/tas  k" Component={TaskLocationPage} />
          <Route path="/location/patrol" Component={PatrolLocationPage} />
          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
