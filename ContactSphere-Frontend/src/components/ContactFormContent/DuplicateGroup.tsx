import { nanoid } from "@reduxjs/toolkit"
import { Duplicate } from "../../vite-env"
import DuplicateContact from "./DuplicateContact"
import { useMergeDuplicateContactsMutation } from "../../RTK/features/api/injectedContactsApiQueries"
import { useAppSelector } from "../../customHooks/reduxCustomHooks"
import LoadingButton from "../../../lib/buttons/LoadingButton"
import stopUnauthourizedActions from "../../utils/helperFns/stopUnauthourizedActions"

export default function DuplicateGroup( { group }:{ group:Duplicate[]}){

   const [mergeDuplicates, { isLoading }] = useMergeDuplicateContactsMutation()
   const { uid }  = useAppSelector(store => store.authUser.userDetails)
   
   const handleMerge = async(mergeGroup:Duplicate[]) => {
      const duplicatesIds = mergeGroup.map(v => v._id)

      try{
         await stopUnauthourizedActions(uid)
         const res = await mergeDuplicates({
            authUserUid: uid!,
            duplicatesIds
         })
      }
      catch(err:unknown|any){
         
      }
   }

   return(
      <div key={nanoid()} className="duplicate_group">
         {
            group.map(val => (
               <DuplicateContact {...val} />
            ))
         }
         <div>
            <button>Dismiss</button>
            <LoadingButton 
               size="sm"
               loading={isLoading}
               buttonType="button"
               buttonText="Merge"
               handleClick={() => handleMerge(group)}
            />
         </div>
      </div>
   )
}