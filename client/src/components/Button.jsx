import "./styles/Button.css";

function Button({ name, image, disabled, style, onClick = () => {} }) {
  return (
    <button
      className={`universal-button ${style}`}
      onClick={onClick}
      disabled={disabled}
    >
      {image && <img src={image} />}
      {name}
    </button>
  );
}

export default Button;
