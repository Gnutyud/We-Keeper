import PropTypes from 'prop-types';
import { useContext } from 'react';
import AppContext from '../../store/context';

const Search = ({ text, cname }) => {
  const { noteData, turnOnSearchingMode, turnOffSearchingMode, setSearchResult, isSearching, searchInput, setSearchInput } = useContext(AppContext);

  const searchHandle = () => {
    turnOnSearchingMode();
    // get matches to current text input search
    let matches = noteData.filter((note) => {
      const regex = new RegExp(`${searchInput}`, "gmi");
      return note.title.match(regex) || note.text.match(regex);
    });
    if (searchInput.length === 0) {
      matches = noteData;
    }
    setSearchResult(matches);
  };

  const onCloseSearchTab = () => {
    setSearchInput("");
    turnOffSearchingMode();
  };

  return (
    <div className='header-search'>
      <i className='fa fa-search'></i>
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        onClick={searchHandle}
        value={searchInput}
        type='text'
        placeholder={text}
        className={cname}
        onKeyUp={searchHandle}
      />
      {isSearching && (
        <i className='fa fa-times' aria-hidden='true' onClick={onCloseSearchTab}></i>
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
