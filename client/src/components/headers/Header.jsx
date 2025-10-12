import "./Header.css";

export default function Header(props) {
  return (
    <header className="header">
      ¡{props.nombre}, te otorgamos 3 y 6 cuotas sin interés!
    </header>
  );
}
