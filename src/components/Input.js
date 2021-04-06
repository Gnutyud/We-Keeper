import PropTypes from "prop-types";
const Input = ({ onClick, color, text, display, cname }) => {
  return (
    <div className="header-search">
      <i className="fa fa-search" style={{ display: display }}></i>
      <input
        onClick={onClick}
        type="text"
        placeholder={text}
        className={cname}
        style={{ backgroundColor: color }}
      />
    </div>
  );
};
Input.prototypes = {
  onClick: PropTypes.func.isRequired,
  display: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
};
Input.defaultProps = {
  color: "#fff",
  display: "none",
};
export default Input;
