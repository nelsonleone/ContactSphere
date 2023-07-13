import { HiSearch } from 'react-icons/hi';
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../customHooks/reduxCustomHooks';
import findSearchedContacts from '../utils/helperFns/findSearchedContacts';
import { setSearchResult } from '../RTK/features/searchContactsSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

function SearchBar() {

  const [showSearchbar, setShowSearchbar] = useState<boolean | null>(null)
  const dispatch = useAppDispatch()
  const { contacts }  = useAppSelector(store => store.userData)
  const { searchedContacts } = useAppSelector(store => store.searchContacts)
  const [searchValue,setSearchValue] = useState("")
  const navigate = useNavigate()

  const handleSetSearchResult = () => {
    const result = findSearchedContacts(contacts,searchValue)
    dispatch(setSearchResult(result))
  }

  useEffect(() => {
    if(searchValue === "")return;

    handleSetSearchResult()
  },[searchValue])


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
    <>
      <div className="searchbar">
        <button 
          aria-haspopup={window.innerWidth < 640 ? "true" : "false"} 
          aria-controls="searchbar-input" 
          className="search-icon" 
          onClick={()  => window.innerWidth < 640 ? setShowSearchbar(!showSearchbar) : null} 
          >
          <HiSearch />
        </button>
        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} id="searchbar-input" name="searchbar-input" placeholder="Search" className={showSearchbar ? "searchbar-input" : "searchbar-input hide-searchbar"} />
      </div>
      {
        searchValue !== "" &&
        <div className="search_results">
          {
            searchValue && searchedContacts.length ? searchedContacts.map(c => (
              <div className="search-result" key={nanoid()} onClick={() => navigate(`/c/${c._id}`)}>
                <p>{c.name || `${c.prefix} ${c.firstName} ${c.lastName} ${c.middleName} ${c.suffix}`}</p>
              </div>
            ))
            :
            <p>No Result From Search</p>
          }
        </div>
      }
    </>
  )
}

export default SearchBar;