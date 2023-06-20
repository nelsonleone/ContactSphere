import { HiSearch } from 'react-icons/hi';
import { useState, useEffect } from 'react'

function SearchBar() {

  const [showSearchbar, setShowSearchbar] = useState<boolean | null>(null)


  useEffect(() => {    
    const resizeHandler = () => {
      window.innerWidth < 640 ? setShowSearchbar(false) : setShowSearchbar(true)
    }

    resizeHandler()

    window.addEventListener('resize',resizeHandler)
    return () =>{
      window.removeEventListener('resize',resizeHandler)
    }
  }, [])

  

  return (
    <div className="searchbar">
      <button aria-haspopup={window.innerWidth < 640 ? "true" : "false"} aria-controls="searchbar-input" className="search-icon" onClick={()  => setShowSearchbar(!showSearchbar)} >
        <HiSearch />
      </button>
      <input type="text" id="searchbar-input" name="searchbar-input" placeholder="Search" className={showSearchbar ? "searchbar-input" : "searchbar-input hide-searchbar"} />
    </div>
  )
}

export default SearchBar;