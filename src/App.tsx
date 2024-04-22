import "./App.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
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
import Footer from "./components/common/Footer";
import SidebarMain from "./components/SidebarMain";
import { useAppSelector } from "./hooks/useRedux";
import { useEffect } from "react";
import { asyncPreload } from "./states/preload/action";
import { AppDispatch } from "./states/store";
import { useDispatch } from "react-redux";

function App() {
  const { auth = null, preload = false } = useAppSelector((state) => state);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreload());
  }, [dispatch]);

  if (preload) {
    return null;
  }
  return (
    <>
      <Router>
        {auth != null && (
          <div className="h-screen">
            <div className="flex">
              <SidebarMain />
              <div className="h-screen w-screen">
                <Routes>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/category" element={<CategoryPage />} />
                  <Route path="/employee" element={<EmployePage />} />
                  <Route
                    path="/product/master"
                    element={<MasterProductPage />}
                  />
                  <Route path="/product/item" element={<ItemProductPage />} />
                  <Route path="/product/task" element={<TaskProductPage />} />
                  <Route
                    path="/product/patrol"
                    element={<PatrolProductPage />}
                  />
                  <Route
                    path="/location/master"
                    element={<MasterLocationPage />}
                  />
                  <Route path="/location/item" element={<ItemLocationPage />} />
                  <Route path="/location/task" element={<TaskLocationPage />} />
                  <Route
                    path="/location/patrol"
                    element={<PatrolLocationPage />}
                  />
                </Routes>
                <Footer />
              </div>
            </div>
          </div>
        )}

        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
