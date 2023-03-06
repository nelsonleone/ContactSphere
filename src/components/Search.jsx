import { useState, useEffect, useCallback } from "react"
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { CgSearchLoading } from "react-icons/cg"
import { getSearchQuery } from "../redux/features/asyncThunks"
import { useLocation, useNavigate } from "react-router-dom"



export default function Search(){

   const [inputValue,setInputValue] = useState("")
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const [isSearching,setIsSearching] = useState(false)
   const { foundContacts } = useSelector(store => store.search)
    
   useEffect(() => {
      if(!inputValue){
         setIsSearching(false)
         return;
      }

      dispatch(getSearchQuery(inputValue))
      setIsSearching(true)
   }, [inputValue])


   useEffect(()=>{
      setInputValue("")
   },[location.pathname])


   return(
      <div className="search-area">
         <FaSearch className="search-icon" />
         <input type="text" placeholder="search" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
         {
            isSearching &&
            <div className="search-result">
               {  
                  foundContacts.length ?
                  foundContacts.map(contactInfo =>  {
                     return(
                        <div className="found-contact" onClick={() => navigate(`/contact/${contactInfo.id}`)} key={contactInfo.id}>
                           <p>{contactInfo.prefix} {contactInfo.firstName} {contactInfo.lastName}</p>
                        </div>
                     )
                  })
                  :
                  <CgSearchLoading className="loading-placeholder"/>
               }
            </div>
         }
      </div>
   )
}