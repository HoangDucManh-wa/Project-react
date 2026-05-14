import "./Input.css";

export default function Input({
  type = "text",
  variant = "primary",
  placeholder,
  onChange,
  onKeyDown,
  value,
}) {
  return (
    <input
      type={type}
      className={`input-${variant}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      onKeyDown={onKeyDown}
    />
  );
}
