export default function handleContactDetailsDisplay(string:string){
   if (string && string?.length > 20){
      return `${string.slice(0,20)}...`;
   }else{
      return string;
   }
}