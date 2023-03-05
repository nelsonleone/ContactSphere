import { useLocation } from "react-router-dom"

export default function Loading({set}){
   const location = useLocation()


   return(
      set &&
      <div className="loader-container">
         <img src="/images/loading.svg" alt="loading" />
      </div>
   )
}