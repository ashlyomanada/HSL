import "./App.css";
import HomePage from "./pages/user/HomePage";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/user/Navbar";
import Footer from "./components/shared/Footer";
import { useLocation } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage";
import ToggleProvider from "./context/ToggleProvider";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {!pathname.includes("admin") ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <ToggleProvider>
          <AdminPage />
        </ToggleProvider>
      )}
    </>
  );
}

export default App;
