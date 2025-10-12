import React, { useState } from "react";
import "./HotelCarousel.css";
import { hoteles } from "../../mockdata/Hoteles.js";
import CarouselItem from "../carouselItem/CarouselItem.jsx";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function HotelCarousel() {
  const [index, setIndex] = useState(0);
  const visible = 3;

  const siguiente = () => {
    if (index < hoteles.length - visible) setIndex(index + 1);
  };

  const anterior = () => {
    if (index > 0) setIndex(index - 1);
  };

  if (!Array.isArray(hoteles) || hoteles.length === 0) {
    return <p className="carousel-empty">No hay hoteles disponibles</p>;
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
              <CarouselItem hotel={hotel} />
            ))}
          </div>
        </div>

        <button
          onClick={anterior}
          disabled={index === 0}
          className={`carousel-btn left-btn ${index === 0 ? "disabled" : ""}`}
        >
          <FaArrowAltCircleLeft className="arrow-icon" />
        </button>

        <button
          onClick={siguiente}
          disabled={index >= hoteles.length - visible}
          className={`carousel-btn right-btn ${
            index >= hoteles.length - visible ? "disabled" : ""
          }`}
        >
          <FaArrowAltCircleRight className="arrow-icon" />
        </button>
      </div>
    </div>
  );
}
