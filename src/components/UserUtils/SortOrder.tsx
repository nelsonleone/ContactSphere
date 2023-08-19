import { FormControl, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import Radio from '@mui/material/Radio';
import { SortBy } from '../../enums';
import { useCallback, Dispatch, SetStateAction } from 'react';

export default function SortOrder({selectedValue,setSelectedValue}: { selectedValue:SortBy, setSelectedValue:Dispatch<SetStateAction<SortBy>> }){

   const controlProps = useCallback((item:string) => ({
      checked: selectedValue === item,
      onChange: handleChange,
      value: item,
      name: 'firstName',
      inputProps: { 'aria-label': item },
   }), [selectedValue])

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value as SortBy)
   }

   return(
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
   )
}