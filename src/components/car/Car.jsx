import axios, { AxiosHeaders } from "axios";
import { useEffect, useState, useSyncExternalStore } from "react";
import "./car.css";

const baseURL = "http://localhost:3000";

export default function Car() {
  const [cars, setCars] = useState([]);
  const [carValueName, setCarValueName] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/garage`).then((response) => {
      setCars(response.data);
    });
  }, []);

  function deleteCar(id) {
    const url = `${baseURL}/garage/${id}`;
    axios
      .delete(url)
      .then(() => {
        console.log(`Car ${id} deleted`);
      })
      .catch((error) => {
        console.log("404 NOT FOUND ERROR", error);
      });
  }

  if (!cars) return "No car";

  return (
    <div className="car">
      {cars.map((car) => (
        <div className="car__options" key={car.id}>
          <div className="car__buttons">
            <button className="button button-car buttonSelect">select</button>
            <button
              onClick={() => deleteCar(car.id)}
              className=" button button-car buttonRemove"
            >
              remove
            </button>
          </div>
          <div className="car__wrapper">
            <div className="car__buttons">
              <button className="button button-basic buttonStart">start</button>
              <button className="button button-basic buttonStart">stop</button>
            </div>
            <span className="car__name">{car.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
