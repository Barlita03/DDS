import "./NavBar.css";
import "../../index.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router";

export default function NavBar({ onMenuClick }) {
  return (
    <section className="navbar-bg">
      <nav className="navbar">
        <div className="navbar-section left">
          <button className="menu-icon" onClick={onMenuClick}>
            ☰
          </button>
        </div>

        <div className="navbar-section center">
          <div>
            <Link to={"/"} className="link-no-style">
              <h1 className="brand-text">Cirbnb.com</h1>
            </Link>
          </div>
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
