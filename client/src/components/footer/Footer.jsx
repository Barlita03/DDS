import "./Footer.css";
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { LuMapPin } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        <BsTelephone /> 1125556000 (lun a vie 10 a 17hs)
      </p>
      <p>
        <CiMail /> hola@thisisfeliznavidad.com
      </p>
      <p>
        <LuMapPin /> AV CÓRDOBA (Av Córdoba 4517), RECOLETA (Talcahuano 996),
        PALERMO (Av Sta Fé 3122), ABASTO SHOPPING, BARRIO CHINO, TORTUGAS OPEN
        MALL
      </p>
    </footer>
  );
}
