import "./sideBar.css";
import { IoMdClose } from "react-icons/io";

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="title">
        <IoMdClose className="close-icon" />
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
