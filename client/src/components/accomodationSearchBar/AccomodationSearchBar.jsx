import "./AccomodationSearchBar.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export default function AccomodationSearchBar() {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <h3>Destino</h3>

        <div className="search-input-container">
          <div className="search-input">
            <FaMapMarkerAlt className="search-icon" />
            <input type="text" placeholder="¿A dónde vas?" />
          </div>

          <button className="search-button">
            <FaSearch className="button-icon" />
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
