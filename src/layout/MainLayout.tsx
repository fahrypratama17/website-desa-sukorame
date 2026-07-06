import { Outlet } from "react-router-dom";
import Navbar from "../shared/components/Navbar.tsx";
import Footer from "../shared/components/Footer.tsx";

const MainLayout = () => {
  return (
    <div className="bg-white-50 relative flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
