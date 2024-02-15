export default function buttons({ children, onClick, isActive }) {
  return (
    <button className={isActive ? "button active" : "button"} onClick={onClick}>
      {children}
    </button>
  );
}
