export default function ContactImage({image,className}){
   return(
      <img src={image ? image : "/images/userIcon.webp"} alt="contact image" className={className}/>
   )
}