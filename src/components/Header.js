import logo from "./logo.jpg";
import PropTypes from "prop-types";
import Input from "./Input";

const Header = ({ title }) => {
  const searchHandle = () => {
    console.log("change");
  };
  return (
    <div className="header-nav">
      <div className="logo-name">
        <img src={logo} alt="logo" className="logo" />
        <p>{title}</p>
      </div>
      <Input
        onClick={searchHandle}
        color="#f1f3f4"
        text="Search..."
        display="block"
        cname="btn"
      />
    </div>
  );
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
};
Header.defaultProps = {
  title: "We Keeper",
};
export default Header;
