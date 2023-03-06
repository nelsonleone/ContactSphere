export default function phoneNumberStringFormatter(phoneNumber){
   if(phoneNumber){
      const formattedNumber = phoneNumber.replace(/\D/g, "").match(/(\d{1,3})(\d{1,3})(\d{1,4})/);
      const formattedString = `+${formattedNumber[1]} ${formattedNumber[2]} ${formattedNumber[3]}`;
      
      return formattedString;
   }
   else{
      return "";
   }
}