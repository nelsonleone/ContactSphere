import { AccordionDetails, AccordionSummary, FormControl, FormControlLabel, FormLabel, RadioGroup, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import { orange } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import { Dispatch, SetStateAction, useState, memo } from 'react';
import { BsColumnsGap } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { HelpIcon, SettingsIcon } from '../../lib/with-tooltip/index'
import { IHeaderState } from '../../src/components/Header'

interface IProps {
   setState: Dispatch<SetStateAction<IHeaderState>>,
   state: IHeaderState
}

function Setting(props:IProps){
   const { setState, state } = props;
   const [selectedValue,setSelectedValue] = useState<string>("")

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

   const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'sortby-firstname',
    inputProps: { 'aria-label': item },
  })

   const controlProps2 = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'sortby-lastname',
    inputProps: { 'aria-label': item },
  })

   return(
      <>
         <SettingsIcon setState={setState} state={state} />
         {
            state.toggleSettingSection &&
            <section aria-hidden={state.toggleSettingSection} id="setting-section" className="setting-section">
               <h4>Settings</h4>
               <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Sort by</FormLabel>
                  <RadioGroup
                     aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue="female"
                     name="radio-buttons-group"
                     >
                     <FormControlLabel 
                     value="male" 
                     control={
                        <Radio 
                           {...controlProps("firstname")}
                           sx={{
                           color: orange[600],
                           '&.Mui-checked': {
                              color: orange[800],
                           },
                           }} 
                        />
                        } 
                        label="Firstname" 
                     />
                     <FormControlLabel 
                     value="male" 
                     control={
                        <Radio 
                           {...controlProps2("lastname")}
                           sx={{
                              color: orange[600],
                              '&.Mui-checked': {
                                 color: orange[800],
                              },
                           }} 
                        />
                        } 
                        label="Lastname" 
                     />
                  </RadioGroup>
               </FormControl>

               <h4>
                  <BsColumnsGap />
                  Change Column Order
               </h4>
            </section>
         }
      </>
   )
}





function Help(props:IProps){
   const { setState, state } = props;
   const [expanded, setExpanded] = useState<string>("")
   const handleChange = (val:string) =>  {
      setExpanded(val)
   }

   return(
      <>
        <HelpIcon setState={setState} state={state} />
        {
         state.openHelpArea &&
         <div id="help-area" aria-hidden="true" className="help-area">
            <Link to="/send_feedback">Send Feedback</Link>

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
                     <Typography sx={{ color: 'text.secondary' }}>
                        Caution over deleted contacts
                     </Typography>
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
                     <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        How Do I Group My Contacts
                     </Typography>
                     <Typography sx={{ color: 'text.secondary' }}>
                        Try Out <i>Labels</i>
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
        }
      </>
   )
}

export const MemoizedSetting = memo(Setting)
export const MemoizedHelp = memo(Help)
