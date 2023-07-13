import { AccordionDetails, AccordionSummary, FormControl, FormControlLabel, FormLabel, RadioGroup, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import Radio from '@mui/material/Radio';
import { Dispatch, SetStateAction, useState, memo, useCallback } from 'react';
import { SettingsIcon } from '../../lib/with-tooltip/index'
import { IHeaderState } from '../../src/components/Header'
import { Paper, Dialog } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../customHooks/reduxCustomHooks';
import { setSortBy } from '../RTK/features/userLocalSettingSlice';
import { SortBy } from '../enums';

interface IProps {
   setState: Dispatch<SetStateAction<IHeaderState>>,
   state: IHeaderState
}

function Setting(props:IProps){
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
                     defaultValue={sortBy}
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





function Help(){
   const [expanded, setExpanded] = useState<string>("")
   const handleChange = (val:string) =>  {
      setExpanded(val)
   }

   return(
      <div id="help-faq" aria-hidden="true" className="help-faq">
         <div className="accordion-container">
            <Accordion expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')}>
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
               >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                     Are My Contacts Secure
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}></Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <Typography>
                     Your data is personalized and private to just you and stored on the cloud.
                     So yes your contacts are 100% secure.
                  </Typography>
               </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={() => handleChange('panel2')}>
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
               >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>Can I Get Back My Deleted Contacts</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <Typography>
                     When you a contact, it will be moved to your <strong>TRASH</strong> and we will persist that contact still till after 
                     30days, or you delete it again from the <strong>TRASH</strong>.
                  </Typography>
               </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={() => handleChange('panel3')}>
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
               >
                  <Typography sx={{ width: '33%', flexShrink: 0}}>
                     How Do I Group My Contacts
                  </Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <Typography>
                     We made it easy for users to group their contacts using <strong>LABELS</strong>.
                     Add relative contacts under a label to easily find and search for them.
                  </Typography>
               </AccordionDetails>
            </Accordion>

            <Accordion  expanded={expanded === 'panel4'} onChange={() => handleChange('panel4')}>
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
               >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>Restoring Back Contacts</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <Typography>
                     As far as your contacts are still available in the <strong>TRASH</strong>.
                     You can restore them back. Navigate to your <strong>TRASH</strong> and choose which contact to restore.
                  </Typography>
               </AccordionDetails>
            </Accordion>
         </div>
   </div>
   )
}

export const MemoizedSetting = memo(Setting)
export const MemoizedHelp = memo(Help)
