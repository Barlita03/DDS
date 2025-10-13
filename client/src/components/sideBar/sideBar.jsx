import "./sideBar.css";
import { IoMdClose } from "react-icons/io";

export default function SideBar({ open, onClose }) {
  return (
    <div className={`sidebar ${open ? " sidebar-open" : " sidebar-closed"}`}>
      <div className="title">
        <IoMdClose className="close-icon" onClick={onClose} />
        <h2>Cirbnb.com</h2>
      </div>

      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>
    </div>
  );
}
