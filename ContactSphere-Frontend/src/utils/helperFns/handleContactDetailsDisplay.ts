export default function handleContactDetailsDisplay(string:string){
   if (string.length > 19){
      return `${string.slice(0,19)}...`;
   }else{
      return string;
   }
}