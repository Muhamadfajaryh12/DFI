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
import Footer from "./components/common/Footer";
import SidebarMain from "./components/SidebarMain";
import { useAppSelector } from "./hooks/useRedux";
import { useEffect, useState } from "react";
import { asyncPreload } from "./states/preload/action";
import { AppDispatch } from "./states/store";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { auth = null, preload = false } = useAppSelector((state) => state);
  const [visible, setVisible] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const toggle = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    dispatch(asyncPreload());
  }, [dispatch]);

  if (preload) {
    return null;
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        className={"text-white"}
      />
      <Router>
        {auth != null && (
          <div className="">
            <div className="flex">
              <SidebarMain visible={visible} />
              <div className="h-screen w-screen bg-gray-100">
                <Routes>
                  <Route
                    path="/profile"
                    element={<ProfilePage toggle={toggle} />}
                  />
                  <Route
                    path="/dashboard"
                    element={<DashboardPage toggle={toggle} />}
                  />
                  <Route
                    path="/category"
                    element={<CategoryPage toggle={toggle} />}
                  />
                  <Route
                    path="/employee"
                    element={<EmployePage toggle={toggle} />}
                  />
                  <Route
                    path="/product/master"
                    element={<MasterProductPage toggle={toggle} />}
                  />
                  <Route
                    path="/product/item"
                    element={<ItemProductPage toggle={toggle} />}
                  />
                  <Route
                    path="/product/task"
                    element={<TaskProductPage toggle={toggle} />}
                  />
                  <Route
                    path="/product/patrol"
                    element={<PatrolProductPage toggle={toggle} />}
                  />
                  <Route
                    path="/location/master"
                    element={<MasterLocationPage toggle={toggle} />}
                  />
                  <Route
                    path="/location/item"
                    element={<ItemLocationPage toggle={toggle} />}
                  />
                  <Route
                    path="/location/task"
                    element={<TaskLocationPage toggle={toggle} />}
                  />
                  <Route
                    path="/location/patrol"
                    element={<PatrolLocationPage toggle={toggle} />}
                  />
                </Routes>
                <Footer />
              </div>
            </div>
          </div>
        )}

        <>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            className={"text-white"}
          />
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </>
      </Router>
    </>
  );
}

export default App;
