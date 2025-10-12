import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/headers/Header.jsx";
import NavBar from "./components/headers/NavBar.jsx";
import AccomodationSearchBar from "./components/accomodationSearchBar/AccomodationSearchBar.jsx";
import HotelCarousel from "./components/hotelCarousel/HotelCarousel.jsx";

function App() {
  return (
    <>
      <Header nombre="Nicolás"></Header>
      <NavBar></NavBar>
      <AccomodationSearchBar></AccomodationSearchBar>
      <HotelCarousel></HotelCarousel>
    </>
  );
}

export default App;
