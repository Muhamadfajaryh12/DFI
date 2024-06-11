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
import Header from "./components/common/Header";

function App() {
  const { auth = null, preload = false } = useAppSelector((state) => state);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
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
        {auth != null ? (
          <div className="">
            <div className="flex">
              <SidebarMain visible={visible} setVisible={setVisible} />
              <div className=" w-screen bg-gray-200">
                <Header title={title} toggle={toggle} />
                <div style={{ minHeight: "900px" }}>
                  <Routes>
                    <Route
                      path="/profile"
                      element={<ProfilePage setTitle={setTitle} />}
                    />
                    <Route
                      path="/"
                      element={<DashboardPage setTitle={setTitle} />}
                    />
                    <Route
                      path="/category"
                      element={<CategoryPage setTitle={setTitle} />}
                    />
                    <Route
                      path="/employee"
                      element={<EmployePage setTitle={setTitle} />}
                    />
                    <Route
                      path="/product/master"
                      element={<MasterProductPage setTitle={setTitle} />}
                    />
                    <Route
                      path="/product/item"
                      element={<ItemProductPage setTitle={setTitle} />}
                    />
                    <Route
                      path="/product/task"
                      element={<TaskProductPage setTitle={setTitle} />}
                    />
                    <Route
                      path="/product/patrol"
                      element={<PatrolProductPage setTitle={setTitle} />}
                    />
                    <Route
                      path="/location/master"
                      element={<MasterLocationPage setTitle={setTitle} />}
                    />
                    <Route
                      path="/location/item"
                      element={<ItemLocationPage setTitle={setTitle} />}
                    />
                    <Route
                      path="/location/task"
                      element={<TaskLocationPage setTitle={setTitle} />}
                    />
                    <Route
                      path="/location/patrol"
                      element={<PatrolLocationPage setTitle={setTitle} />}
                    />
                  </Routes>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </Router>
    </>
  );
}

export default App;
