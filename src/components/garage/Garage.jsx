import axios from "axios";
import { useEffect, useState } from "react";
import "./garage.css";

const baseURL = "http://localhost:3000";

export default function Garage() {
  const [carName, setCarName] = useState(null);
  const [carColor, setCarColor] = useState(null);
  const [cars, setCars] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/garage`).then((response) => {
      setCars(response.data);
    });
  }, []);

  function createPost() {
    axios
      .post(`${baseURL}/garage`, {
        name: carName,
        color: carColor,
      })
      .then((response) => {
        setCars(response.data);
      });
  }

  return (
    <div className="garage">
      <div className="wrapper">
        <div className="garage__options">
          <div className="options">
            <div className="option create-car">
              <div className="option__wrapper">
                <input
                  className="option__input option__input__text create-car__name"
                  type="text"
                  onChange={(e) => setCarName(e.target.value)}
                />
                <input
                  className="option__input__color create-car__color"
                  type="color"
                  onChange={(e) => setCarColor(e.target.value)}
                />
              </div>
              <button
                className="button button-additional create-car__button"
                onClick={createPost}
              >
                Create
              </button>
            </div>
            <div className="option update-car">
              <div className="option__wrapper">
                <input
                  className="option__input option__input_text update-car__name"
                  type="text"
                />
                <input
                  className="option__input__color update-car__color"
                  type="color"
                />
              </div>
              <button className="button button-additional update-car__button">
                Update
              </button>
            </div>
            <div className="option__race">
              <button className="button option__button button-default race">
                Race
              </button>
              <button className="button option__button button-default reset">
                Reset
              </button>
              <button className="button option__button button-default generate-cars">
                Generate Cars
              </button>
            </div>
          </div>
          <h2 className="heading">
            Garage (<span className="garage__carsTotal"></span>)
          </h2>
        </div>
      </div>
    </div>
  );
}
