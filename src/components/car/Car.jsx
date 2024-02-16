import axios from "axios";
import { useEffect, useState } from "react";
import "./car.css";

const baseURL = "http://localhost:3000";

export default function Car() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/garage`).then((response) => {
      setCars(response.data);
    });
  }, []);

  return (
    <div className="car">
      <div className="car__options">
        <div className="car__buttons">
          <button className="button button-car buttonSelect">select</button>
          <button className="button button-car buttonRemove">remove</button>
        </div>
        {cars.map((car) => (
          <div className="car__wrapper" key={car.id}>
            <div className="car__buttons">
              <button className="button button-basic buttonStart">start</button>
              <button className="button button-basic buttonStart">stop</button>
            </div>
            <span className="car__name">{car.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
