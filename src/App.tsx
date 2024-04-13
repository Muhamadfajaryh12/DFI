import "./App.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import loginPage from "./pages/loginPage";
import PegawaiPage from "./pages/pegawaiPage";
import SidebarMain from "./components/SidebarMain";

function App() {
  return (
    <>
      <Router>
        <div className="">
          <SidebarMain />
          <Routes>
            <Route path="/" Component={loginPage} />
            <Route path="/employee" Component={PegawaiPage} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
