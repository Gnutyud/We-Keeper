import logo from '../../assets/images/logo.jpg';
import PropTypes from 'prop-types';
import Search from './Search';

const Header = ({
  title,
  onClick,
  isSearch,
  searchClose,
  searchText,
  setSearchText,
}) => {
  const onChange = () => {
    onClick(searchText);
  };

  return (
    <div className='header-nav'>
      <div className='logo-name'>
        <img src={logo} alt='logo' className='logo' />
        <p>{title}</p>
      </div>
      <Search
        onClick={onChange}
        text='search what you want...'
        cname='btn btn-color search'
        search={searchText}
        setSearch={setSearchText}
        isSearch={isSearch}
        searchClose={searchClose}
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
