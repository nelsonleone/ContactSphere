export default function checkExternalLinks(link:string){
   const checkedLink = link.slice(0,5) === "https" ? link : `https://${link}`

   return checkedLink;
}