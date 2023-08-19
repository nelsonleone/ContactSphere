import { useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import { useMemo } from 'react'

export default function Loader(){

   const { load } = useAppSelector(store => store.loading)

   const loaderStyles = useMemo(() => {
      return {
         backgroundColor: "hsl(0,0%,0.5%)",
         width: "100%",
         height: "100%",
         zIndex: "9999",
         top: "0",
         bottom: "0",
         left: "0",
         right: "0",
         position: "fixed" as 'fixed',
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         overflow: "hidden"
      }
   },[])

   return(
      load ?
      <div style={loaderStyles}>
         <img src="/images/loading-icon.svg" aria-label="loading" alt="Loading" />
      </div>
      :
      null
   )
}