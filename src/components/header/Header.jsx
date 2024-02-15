import Buttons from "./Buttons";
import "./header.css";

export default function Header({ active, onChange }) {
  return (
    <div className="header">
      <div className="header__wrapper wrap">
        <div className="header__buttons">
          <Buttons
            isActive={active === "garage"}
            onClick={() => onChange("garage")}
          >
            to garage
          </Buttons>
          <Buttons
            isActive={active === "winners"}
            onClick={() => onChange("winners")}
          >
            to winners
          </Buttons>
        </div>
      </div>
      <div className="header__logo wrap">
        <h1>async race</h1>
      </div>
    </div>
  );
}
