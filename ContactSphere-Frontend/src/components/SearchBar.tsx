import { HiSearch } from 'react-icons/hi';
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../customHooks/reduxCustomHooks';
import findSearchedContacts from '../utils/helperFns/findSearchedContacts';
import { setSearchResult } from '../RTK/features/searchContactsSlice';
import { nanoid } from '@reduxjs/toolkit';
import { Breakpoints } from '../enums'
import { useNavigate } from 'react-router-dom';

function SearchBar() {

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

  

  return (
    <>
      <div className="searchbar">
        <HiSearch />
        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} id="searchbar-input" name="searchbar-input" placeholder="Search" className="searchbar-input" />
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