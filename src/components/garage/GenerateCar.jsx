import axios from "axios";

const baseURL = "http://localhost:3000";

const brands = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "BMW",
  "Audi",
  "Mercedes-Benz",
  "Volkswagen",
  "Tesla",
  "Subaru",
  "Nissan",
  "Lexus",
  "Mazda",
  "Jeep",
  "Hyundai",
  "Kia",
  "Volvo",
  "Porsche",
  "Ferrari",
  "Lamborghini",
  "Rolls-Royce",
  "Bentley",
  "Jaguar",
  "Land Rover",
  "Maserati",
  "Aston Martin",
  "Bugatti",
  "McLaren",
  "MINI",
  "Fiat",
  "Alfa Romeo",
  "Chrysler",
  "Dodge",
  "Infiniti",
  "Buick",
  "Cadillac",
  "Lincoln",
];

export default function GenerateCar() {
  const generateCar = async () => {
    const name = brands[Math.floor(Math.random() * brands.length)];
    const color = generateRandomHexColor();
    const data = { name, color };

    try {
      const response = await axios.post(`${baseURL}/garage`, data);
      console.log("Create car with name", name, response);
    } catch (error) {
      console.error(error.message);
    }
  };

  const generateRandomHexColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215);
    const hexColor = "#" + randomColor.toString(16).padStart(6, "0");
    return hexColor;
  };

  return (
    <button
      onClick={generateCar}
      className="button button-additional create-car__button"
    >
      Create
    </button>
  );
}
