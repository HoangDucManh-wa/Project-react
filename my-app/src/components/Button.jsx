import "./Button.css";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  size = "large",
  variant = "primary",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${size} btn-${variant}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
