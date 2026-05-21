import "./Button.css";
export default function Button({
  children,
  type = "button",
  loading = false,
  onClick,
  disabled,
  size,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`button-${size}`}
    >
      {loading ? "loading" : children}
    </button>
  );
}
