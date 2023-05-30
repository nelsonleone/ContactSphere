import { HiSearch } from 'react-icons/hi';
import { useState } from 'react'

function SearchBar() {

  const [showSearchbar, setShowSearchbar] = useState(false)

  return (
    <div className="searchbar">
      <HiSearch className="search-icon" onClick={() => setShowSearchbar(!showSearchbar)} />
      {
        showSearchbar &&
        <input type="text" placeholder="Search" />
      }
    </div>
  )
}

export default SearchBar;