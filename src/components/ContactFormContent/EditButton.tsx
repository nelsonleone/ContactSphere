import { useEffect, useState } from "react"
import { Breakpoints } from "../../enums"
import { Button } from "@mui/material"
import { FaPencilAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function EditButton({ navigateTo }: { navigateTo:string }){

   const [penMode,setPenMode] = useState<boolean>(window.innerWidth < Breakpoints.Large)
   const navigate = useNavigate()

   const handleResize = () => {
      setPenMode(window.innerWidth < Breakpoints.Large)
   }

   useEffect(() => {
      window.addEventListener('resize',handleResize)

      return () => window.removeEventListener('resize',handleResize)
   },[])

   return(
      <Button
         type="submit" 
         className="edit-button" 
         variant="contained"  
         aria-label="edit"
         onClick={() => navigate(navigateTo)}
      >
         {
            !penMode ?
            "Edit"
            :
            <FaPencilAlt />
         }
      </Button>
   )
}