import { HiSearch } from 'react-icons/hi';
import { useState, useEffect, memo } from 'react'
import { useAppDispatch, useAppSelector } from '../customHooks/reduxCustomHooks';
import findSearchedContacts from '../utils/helperFns/findSearchedContacts';
import { setSearchResult } from '../RTK/features/slices/searchContactsSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import PhotoUrlAvatar from '../../lib/Avatars/PhotoUrlAvatar';
import { SearchbarCancelSearchIcon } from '../../lib/with-tooltip';
import handleContactDetailsDisplay from '../utils/helperFns/handleContactDetailsDisplay';

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

  const handleNavigate = (id:string) => {
    navigate(`c/${id}`)
    setSearchValue("")
    setSearchResult([])
  }

  useEffect(() => {
    if(searchValue === "")return;

    handleSetSearchResult()
  },[searchValue])

  

  return (
    <>
      <div className="searchbar">
        <HiSearch aria-hidden="true" />
        <input type="text" aria-haspopup="listbox" aria-expanded={searchValue ? "true": "false"} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} id="searchbar-input" name="searchbar-input" placeholder="Search" className="searchbar-input" />
        <SearchbarCancelSearchIcon setSearchValue={setSearchValue} />
        { 
          searchValue !== "" && searchValue.length > 2 ?
          <Card className="search_results" style={{bottom: `calc(-100% - ${searchedContacts.length * 2.8})em`}}>
            {
              searchValue && searchedContacts.length ? searchedContacts.map(c => (
                <div tabIndex={0} className="search-result" key={nanoid()} onClick={() => handleNavigate(c._id)}>
                  <PhotoUrlAvatar size={30} photoURL={c.repPhoto} nameForAlt={c.firstName} />
                  <p id={c._id}>{handleContactDetailsDisplay(`${c.prefix} ${c.firstName} ${c.lastName} ${c.middleName} ${c.suffix}`)}</p>
                </div>
              ))
              :
              <p>No Result From Search</p>
            }
          </Card>
          :
          null
        }
      </div>
    </>
  )
}

export default memo(SearchBar);