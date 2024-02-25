import axios from "axios";
import brands from "./carBrands";

const baseURL = "http://localhost:3000";

export default function GenerateCars() {
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

  async function generateCars() {
    for (let i = 0; i < 100; i++) {
      await generateCar();
    }
  }

  const generateRandomHexColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215);
    const hexColor = "#" + randomColor.toString(16).padStart(6, "0");
    return hexColor;
  };

  return (
    <button
      onClick={generateCars}
      className="button option__button button-default generate-cars"
    >
      Generate Cars
    </button>
  );
}
