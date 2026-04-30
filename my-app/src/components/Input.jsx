import "./Input.css";

const Input = ({ value, onChange, type = "text", placeholder }) => {
  return (
    <input
      className="input"
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
