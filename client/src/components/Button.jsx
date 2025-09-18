import "./styles/Button.css";

function Button({ name, image, disabled, style, onClick = () => {}, children }) {
  return (
    <button
      className={`universal-button ${style}`}
      onClick={onClick}
      disabled={disabled}
    >
      {image && <img src={image} alt="icon" />}
      {children || name}
    </button>
  );
}

export default Button;
