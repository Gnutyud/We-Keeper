import logo from '../../assets/images/logo.jpg';
import PropTypes from 'prop-types';
import Search from './Search';
import Profile from './Profile';
import classes from './Header.module.scss';

const Header = ({
  title,
}) => {

  return (
    <div className='header-nav'>
      <div className='logo-name'>
        <img src={logo} alt='logo' className='logo' />
        <p>{title}</p>
      </div>
      <div className={classes["header-right"]}>
        <Search
          text='search here...'
          cname='btn btn-color search'
        />
        <Profile/>
      </div>
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
