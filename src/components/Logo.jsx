export default function Logo({className}){
   return(
      <h2 className={`logo ${className ? className : ""}`}>ContactSphere</h2>
   )
}