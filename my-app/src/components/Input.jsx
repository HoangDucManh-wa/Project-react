import "./Input.css";

const Input = ({ value, name, onChange, type = "text", placeholder }) => {
  return (
    <input
      className="input"
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
