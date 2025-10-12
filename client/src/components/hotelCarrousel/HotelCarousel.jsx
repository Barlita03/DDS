import React, { useState } from "react";
import "./HotelCarrousel.css";
import { hoteles } from "../../mockdata/Hoteles.js";
import CarouselItem from "../carouselItem/CarouselItem.jsx";

export default function HotelCarrousel() {
  const [index, setIndex] = useState(0);
  const visible = 3;

  function siguiente() {
    if (index < hoteles.length - visible) {
      setIndex(index + 1);
    }
  }

  function anterior() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  if (!Array.isArray(hoteles) || hoteles.length === 0) {
    return <p className="carrousel-empty">No hay hoteles disponibles</p>;
  }

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Ofertas para el fin de semana</h2>

      <div className="carousel-wrapper">
        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${index * (100 / visible)}%)`,
            }}
          >
            {hoteles.map((hotel) => (
              <CarouselItem hotel={hotel} key={hotel.id} />
            ))}
          </div>
        </div>

        <button
          onClick={anterior}
          disabled={index === 0}
          className={`carousel-btn left-btn ${index === 0 ? "disabled" : ""}`}
        >
          ◀
        </button>

        <button
          onClick={siguiente}
          disabled={index >= hoteles.length - visible}
          className={`carousel-btn right-btn ${
            index >= hoteles.length - visible ? "disabled" : ""
          }`}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
