import { nanoid } from "@reduxjs/toolkit"
import { Duplicate } from "../../vite-env"
import DuplicateContact from "./DuplicateContact"
import { useMergeDuplicateContactsMutation } from "../../RTK/features/api/injectedContactsApiQueries"
import { useAppDispatch, useAppSelector } from "../../customHooks/reduxCustomHooks"
import LoadingButton from "../../../lib/buttons/LoadingButton"
import stopUnauthourizedActions from "../../utils/helperFns/stopUnauthourizedActions"
import { setShowAlert } from "../../RTK/features/slices/alertSlice"
import { AlertSeverity } from "../../enums"

export default function DuplicateGroup( { group }:{ group:Duplicate[]}){

   const [mergeDuplicates, { isLoading }] = useMergeDuplicateContactsMutation()
   const { uid }  = useAppSelector(store => store.authUser.userDetails)
   const dispatch = useAppDispatch()
   
   const handleMerge = async(mergeGroup:Duplicate[]) => {

      try{
         await stopUnauthourizedActions(uid)
         const res = await mergeDuplicates({
            authUserUid: uid!,
            duplicates: mergeGroup
         })

         if(!res){
            throw new Error("Server Error")
         }
         dispatch(setShowAlert({
            alertMessage: "Merged Successfully",
            severity: AlertSeverity.SUCCESS
         }))

      }

      catch(err:unknown|any){
         dispatch(setShowAlert({
            alertMessage: err.messsage || "Error Occured during merge",
            severity: AlertSeverity.ERROR
         }))
      }
   }

   return(
      group.length ?
      <div key={nanoid()} className="duplicate_group">
         {
            group.map(val => (
               <DuplicateContact {...val} />
            ))
         }
         <LoadingButton 
            size="sm"
            loading={isLoading}
            buttonType="button"
            buttonText="Merge"
            handleClick={() => handleMerge(group)}
         />
      </div>
      :
      null
   )
}