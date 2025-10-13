import Header from "../../components/headers/Header.jsx";
import NavBar from "../../components/headers/NavBar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header nombre="Nicolás"></Header>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}
