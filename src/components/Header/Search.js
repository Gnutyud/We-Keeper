import PropTypes from 'prop-types';

const Search = ({
  onClick,
  text,
  cname,
  search,
  setSearch,
  isSearch,
  searchClose,
}) => {
  return (
    <div className='header-search'>
      <i className='fa fa-search'></i>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type='text'
        placeholder={text}
        className={cname}
        onKeyUp={onClick}
      />
      {isSearch && (
        <i class='fa fa-times' aria-hidden='true' onClick={searchClose}></i>
      )}
    </div>
  );
};
Search.prototypes = {
  onClick: PropTypes.func.isRequired,
  display: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
};
Search.defaultProps = {
  color: '#ffffff',
  display: 'none',
};
export default Search;
