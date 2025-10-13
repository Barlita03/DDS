import Header from "../../components/headers/Header.jsx";
import NavBar from "../../components/headers/NavBar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import SideBar from "../../components/sideBar/sideBar.jsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <>
      <Header nombre="Nicolás" />
      <NavBar onMenuClick={handleMenuClick} />
      <SideBar open={sidebarOpen} onClose={handleCloseSidebar} />
      <Outlet />
      <Footer />
    </>
  );
}
