import axios from "axios";
import { useEffect, useState } from "react";
import "./garage.css";
import "./car.css";
import carImage from "./car.svg";
import GenerateCars from "./GenerateCars";
import Pagination from "./Pagination";
import brands from "./carBrands";

const baseURL = "http://localhost:3000";

export default function Garage() {
  const [cars, setCars] = useState([]);
  const [carName, setCarName] = useState(null);
  const [carColor, setCarColor] = useState(null);
  const [updatedCarName, setUpdatedCarName] = useState(null);
  const [updatedCarColor, setUpdatedCarColor] = useState(null);
  const [updatedCarId, setUpdatedCarId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 7;
  const nPages = Math.ceil(cars.length / carsPerPage);

  // GET CURRENT POST
  const indexOfLastPost = currentPage * carsPerPage;
  const indexOfFirstPost = indexOfLastPost - carsPerPage;
  console.log(indexOfFirstPost, indexOfLastPost);
  const currentCars = cars.slice(indexOfFirstPost, indexOfLastPost);
  //

  // PAGINATION
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //

  // GET CARS
  useEffect(() => {
    axios.get(`${baseURL}/garage`).then((response) => {
      setCars(response.data);
      console.log("Get cars");
    });
  }, []);
  //

  function createCar() {
    const url = `${baseURL}/garage`;
    axios
      .post(`${url}`, {
        name: carName,
        color: carColor,
      })
      .then((response) => {
        const newCar = response.data;
        setCars((prevCars) => [...prevCars, newCar]);
        console.log("Car created");
      });
  }

  async function getCarNameById(id) {
    const url = `${baseURL}/garage/${id}`;
    const response = await axios.get(`${url}`);
    return response.data;
  }

  function updateCar() {
    const url = `${baseURL}/garage/${updatedCarId}`;
    console.log(url);
    axios.put(`${url}`, {
      name: updatedCarName,
      color: updatedCarColor,
    });
  }

  function deleteCar(id) {
    const url = `${baseURL}/garage/${id}`;

    axios
      .delete(url)
      .then(() => {
        setCars(cars.filter((car) => car.id !== id));
        console.log(`Car with id ${id} deleted`);
      })
      .catch((error) => {
        console.log("404 NOT FOUND ERROR", error);
      });
  }

  const generateCar = async () => {
    const name = brands[Math.floor(Math.random() * brands.length)];
    const color = generateRandomHexColor();

    axios
      .post(`${baseURL}/garage`, {
        name: name,
        color: color,
      })
      .then((response) => {
        const newCar = response.data;
        setCars((prevCars) => [...prevCars, newCar]);
        console.log("Car created");
      });

    const generateRandomHexColor = () => {
      const randomColor = Math.floor(Math.random() * 16777215);
      const hexColor = "#" + randomColor.toString(16).padStart(6, "0");
      return hexColor;
    };
  };

  if (!cars) return "No car";

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
                  defaultValue="#FF4433"
                />
              </div>
              <button
                className="button button-additional create-car__button"
                onClick={() => {
                  const inputElement =
                    document.getElementById("create-car__name");
                  if (inputElement) {
                    console.log("generated");
                    generateCar();
                  } else {
                    createCar();
                  }
                }}
              >
                Create
              </button>
            </div>
            <div className="option update-car">
              <div className="option__wrapper">
                <input
                  id="updateCar"
                  className="option__input option__input_text update-car__name"
                  type="text"
                  onChange={(e) => setUpdatedCarName(e.target.value)}
                />
                <input
                  className="option__input__color update-car__color"
                  type="color"
                  defaultValue="#800080"
                  onChange={(e) => setUpdatedCarColor(e.target.value)}
                />
              </div>
              <button
                className="button button-additional update-car__button"
                onClick={updateCar}
              >
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
              <GenerateCars />
            </div>
          </div>
          <h2 className="heading">
            Garage (<span className="garage__carsTotal">{cars.length}</span>)
          </h2>
        </div>
      </div>
      <div className="car">
        {currentCars.map((car) => (
          <div className="car__options" key={car.id}>
            <div className="car__buttons">
              <button
                className="button button-car buttonSelect"
                onClick={() => {
                  setUpdatedCarId(car.id);
                  const inputElement = document.getElementById("updateCar");
                  const carName = getCarNameById(car.id);
                  console.log(carName);
                  inputElement.value = carName;
                }}
              >
                select
              </button>
              <button
                onClick={() => deleteCar(car.id)}
                className=" button button-car buttonRemove"
              >
                remove
              </button>
            </div>
            <div className="car__wrapper">
              <div className="car__buttons">
                <button className="button button-basic buttonStart">
                  start
                </button>
                <button className="button button-basic buttonStart">
                  stop
                </button>
              </div>
              <span className="car__name">{car.name}</span>
            </div>
            <div className="car__container">
              <img src={carImage} alt="carImage" />
            </div>
          </div>
        ))}
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
