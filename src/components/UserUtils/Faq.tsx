import { AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import { memo, useState } from 'react'

function Faq(){
   const [expanded, setExpanded] = useState<string>("")
   const handleChange = (val:string) =>  {
      setExpanded(val)
   }

   return(
      <div id="help-faq" aria-hidden="true" className="help-faq">
         <h4>Frequently asked questions</h4>
         <div className="accordion-container">
            <Accordion expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')}>
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
               >
                  <Typography sx={{ width: '80%', flexShrink: 0 }}>
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
                  <Typography sx={{ width: '80%', flexShrink: 0 }}>Can I Get Back My Deleted Contacts</Typography>
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
                  <Typography sx={{ width: '80%', flexShrink: 0}}>
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
                  <Typography sx={{ width: '80%', flexShrink: 0 }}>Restoring Back Contacts</Typography>
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

export default memo(Faq)