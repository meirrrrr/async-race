export default function Pagination({ carsPerPage, totlaCars }) {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totlaCars / carsPerPage); i++) {
    pageNumbers.push(i);
  }

  return {};
}
