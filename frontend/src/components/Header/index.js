import logo from '../../assets/images/logo.jpg';
import PropTypes from 'prop-types';
import Search from './Search';

const Header = ({
  title,
}) => {

  return (
    <div className='header-nav'>
      <div className='logo-name'>
        <img src={logo} alt='logo' className='logo' />
        <p>{title}</p>
      </div>
      <Search
        text='search here...'
        cname='btn btn-color search'
      />
    </div>
  );
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
};
Header.defaultProps = {
  title: 'We Keeper',
};
export default Header;
