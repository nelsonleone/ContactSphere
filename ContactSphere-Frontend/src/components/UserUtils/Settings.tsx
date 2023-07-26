import { FormControl, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import Radio from '@mui/material/Radio';
import { Dispatch, SetStateAction, useState, memo, useCallback } from 'react';
import { SettingsIcon } from '../../../lib/with-tooltip/index'
import { IHeaderState } from '../Header'
import { Paper, Dialog } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../customHooks/reduxCustomHooks';
import { setSortBy } from '../../RTK/features/userLocalSettingSlice';
import { SortBy } from '../../enums';

interface IProps {
   setState: Dispatch<SetStateAction<IHeaderState>>,
   state: IHeaderState
}

function Settings(props:IProps){
   const { setState, state } = props;
   const dispatch = useAppDispatch()
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const [selectedValue,setSelectedValue] = useState<SortBy>(sortBy as SortBy)

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value as SortBy)
  }

   const controlProps = useCallback((item:string) => ({
      checked: selectedValue === item,
      onChange: handleChange,
      value: item,
      name: 'firstName',
      inputProps: { 'aria-label': item },
   }), [selectedValue])

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
            <Paper aria-hidden={state.toggleSettingSection} id="setting-section" className="setting-section">
               <h4>Settings</h4>
               <FormControl>
                  <FormLabel id="localSetting-radio-buttons-group-label" className="st-label">Sort by</FormLabel>
                  <RadioGroup
                     aria-labelledby="localSetting-radio-buttons-group-label"
                     value={selectedValue}
                     name="localSetting-buttons-group"
                     >
                     <FormControlLabel 
                     value={SortBy.FirstName}
                     control={
                        <Radio 
                           {...controlProps("firstName")}
                           sx={{
                           color: "#085e61",
                           '&.Mui-checked': {
                              color: "hsl(182, 87%, 27%)",
                           },
                           }} 
                        />
                        } 
                        label="First name" 
                     />
                     <FormControlLabel 
                     value={SortBy.LastName}
                        control={
                           <Radio 
                              {...controlProps("lastName")}
                              sx={{
                                 color: "#085e61",
                                 '&.Mui-checked': {
                                    color: "hsl(182, 87%, 27%)",
                                 },
                              }} 
                           />
                        } 
                        label="Last name" 
                     />
                     <FormControlLabel                     
                        value={SortBy.Newest}
                        control={
                           <Radio 
                              {...controlProps("newest")}
                              sx={{
                                 color:  "#085e61",
                                 '&.Mui-checked': {
                                    color: "hsl(182, 87%, 27%)",
                                 },
                              }} 
                           />
                           } 
                        label="Newest" 
                     />
                  </RadioGroup>
               </FormControl>


            </Paper>
         </Dialog>
      </>
   )
}




export default memo(Settings)