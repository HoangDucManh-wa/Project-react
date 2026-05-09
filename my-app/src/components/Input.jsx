import "./Input.css";

export default function Input({
  type = "text",
  variant = "primary",
  placeholder,
  onChange,
  value,
}) {
  return (
    <input
      type={type}
      className={`input-${variant}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
