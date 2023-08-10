import { Dispatch, SetStateAction, useState, memo } from 'react';
import { SettingsIcon } from '../../../lib/with-tooltip/index'
import { IHeaderState } from '../Header'
import { Dialog, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../customHooks/reduxCustomHooks';
import { setSortBy } from '../../RTK/features/slices/userLocalSettingSlice';
import { SortBy } from '../../enums';
import SortOrder from './SortOrder';
import ColumnReOrder from './ColumnReOrder';

interface IProps {
   setState: Dispatch<SetStateAction<IHeaderState>>,
   state: IHeaderState
}

function Settings(props:IProps){
   const { setState, state } = props;
   const dispatch = useAppDispatch()
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const [selectedValue,setSelectedValue] = useState<SortBy>(sortBy as SortBy)
   const [activeTab,setActiveTab] = useState<"sortBy"|"columnOrder">("sortBy")

   const handleClose = () => {
      dispatch(setSortBy(selectedValue))
      props.setState(prevState => ( {...prevState,toggleSettingSection:false }))
   }

   return(
      <>
         <SettingsIcon setState={setState} state={state} />
         <Dialog 
            open={props.state.toggleSettingSection} 
            onClose={handleClose}
            >
            <Box aria-hidden={state.toggleSettingSection} id="setting-section" className="setting-section">
               <h4>Settings</h4>
               <div role="tab">
                  <div role="tabpanel">
                     <button className={activeTab === "sortBy" ? "active-tab-button" : ""} onClick={() => setActiveTab("sortBy")}>Sort-By</button>
                     <button className={activeTab === "columnOrder" ? "active-tab-button" : ""} onClick={() => setActiveTab("columnOrder")}>Column Order</button>
                  </div>
                  <div className="tab-content">
                     {
                        activeTab === "sortBy" ?
                        <SortOrder setSelectedValue={setSelectedValue} selectedValue={selectedValue} />
                        :
                        <ColumnReOrder data={[
                           {
                              name: "item1",
                              id: "item1"
                           },
                           {
                              name: "item2",
                              id: "item2"
                           },
                           {
                              name: "item3",
                              id: "item3"
                           },
                        ]} />
                     }
                  </div>
               </div>
            </Box>
         </Dialog>
      </>
   )
}




export default memo(Settings)