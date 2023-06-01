import { HiSearch } from 'react-icons/hi';
import { useState } from 'react'

function SearchBar() {

  const [showSearchbar, setShowSearchbar] = useState(false)

  return (
    <div className="searchbar">
      <button aria-controls="searchbar-input" className="search-icon" onClick={() => setShowSearchbar(!showSearchbar)} >
        <HiSearch />
      </button>
      <input type="text" id="searchbar-input" name="searchbar-input" placeholder="Search" className={showSearchbar ? "searchbar-input" : "searchbar-input hide-searchbar"} />
    </div>
  )
}

export default SearchBar;