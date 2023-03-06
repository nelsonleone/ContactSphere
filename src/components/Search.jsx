import { useState, useEffect, useCallback } from "react"
import { FaSearch } from 'react-icons/fa'



export default function Search(){

   const [inputValue,setInputValue] = useState("")


   const handleSearchInputChange = useCallback((e) =>{
      setInputValue(e.target.value)
   })

   useEffect(() =>  {
      
   },[handleSearchInputChange])

   return(
      <div className="search-area">
         <FaSearch className="search-icon" />
         <input type="text" placeholder="search" value={inputValue} onChange={handleSearchInputChange} />
      </div>
   )
}