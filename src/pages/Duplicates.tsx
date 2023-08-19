import { useAppDispatch, useAppSelector } from "../customHooks/reduxCustomHooks";
import PageWrapper from "../components/PageWrapper";
import { GrClone } from 'react-icons/gr'
import { Button } from "@mui/material";
import DuplicateGroup from "../components/ContactFormContent/DuplicateGroup";
import clientAsyncHandler from "../utils/helperFns/clientAsyncHandler";
import stopUnauthourizedActions from "../utils/helperFns/stopUnauthourizedActions";
import { useMergeAllDuplicateContactsMutation } from "../RTK/features/api/injectedContactsApiQueries";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../RTK/features/slices/wrkSnackbarSlice";
import { setShowAlert } from "../RTK/features/slices/alertSlice";
import { AlertSeverity } from "../enums";

function Duplicates({fetchingContacts}: {fetchingContacts:boolean}) {

   const { duplicates } = useAppSelector(store => store.resolveDuplicates)
   const duplicatesArray = Object.values(duplicates)
   const dispatch = useAppDispatch()
   const uid = useAppSelector(store => store.authUser.userDetails.uid)
   const [mergeAll] = useMergeAllDuplicateContactsMutation()

   const handleMergeAll = () => clientAsyncHandler(
      async() => {
         try{
            dispatch(setShowWrkSnackbar())
            await stopUnauthourizedActions(uid)
            const response = await mergeAll({ allDuplicates: duplicatesArray, authUserUid: uid! }).unwrap()
            if(!response){
               throw new Error("Server Error")
            }

            dispatch(setShowAlert({
               alertMessage: "All Duplicates Have Been Resolved",
               severity: AlertSeverity.SUCCESS
            }))
         }

         catch(err:any){
            dispatch(setShowAlert({
               alertMessage: err.message || "Error Occured Merging Contacts",
               severity: AlertSeverity.ERROR
            }))
         }

         finally{
            dispatch(setHideWrkSnackbar())
         }
      },
      dispatch
   )

   return (
      <PageWrapper fetchingContacts={fetchingContacts} className="duplicates" title="ContactSphere | Duplicates">
         <div className="duplicates_page_prompt">
          <p role="alert">Ensure to resolve the duplicates in your saved contacts, to enhance quality user experience</p>
         </div>

         {
            duplicatesArray.length ?
            <section className="merge_area">
               <div className="duplicates_count_container">
                  <GrClone aria-label="duplicates" />
                  <div>
                     <h5>Merge Duplicates</h5>
                     <p>{duplicatesArray.length} unresolved contacts duplicates</p>
                  </div>
               </div>

               <div className="duplicates_container">
                  <div>
                     <span>Merge Duplicates ({duplicatesArray.length})</span>
                     <Button variant="contained" onClick={handleMergeAll}>Merge All</Button>
                  </div>

                  <div>
                     {
                        duplicatesArray.map(group => (
                           <DuplicateGroup group={group} />
                        ))
                     }
                  </div>
               </div>
            </section>
            :
            <div className="nsc_content duplicates_nsc_content">
               <p>Everything is fine here</p>
            </div>
         }
      </PageWrapper>
   )
}

export default Duplicates;