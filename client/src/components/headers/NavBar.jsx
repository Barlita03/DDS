import "./NavBar.css";
import "../../index.css";
import { FaShoppingCart } from "react-icons/fa";

export default function NavBar() {
  return (
    <section className="navbar-bg">
      <nav className="navbar">
        <div className="navbar-section left">
          <button className="menu-icon">☰</button>
        </div>

        <div className="navbar-section center">
          <h1 className="brand-text">Cirbnb.com</h1>
        </div>

        <div className="navbar-section right">
          <button className="cart">
            <FaShoppingCart color="white" />
            <span className="cart-count">0</span>
          </button>
        </div>
      </nav>
    </section>
  );
}
