import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./features/home/Home.jsx";
import Layout from "./features/layout/Layout.jsx";
import HotelDetailPage from "./features/hotels/HotelDetailPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/hotels/:id" element={<HotelDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
