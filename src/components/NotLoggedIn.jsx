import { Link } from "react-router-dom";

export default function NotLoggedIn(){
   return(
      <section className="not-loggedIn">
         <div>
            <h2>You Need To Log In To Proceed</h2>
            <Link to="/signin">Log In</Link>
         </div>
      </section>
   )
}