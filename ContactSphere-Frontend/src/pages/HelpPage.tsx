import { IconButton, Tooltip } from "@mui/material";
import PageWrapper from "../components/PageWrapper";
import { HelpFaq } from "../components/UserUtils";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

export default function HelpPage(){
   return(
      <PageWrapper className="help_page" title="Help & About" >
         <main>
            <h2>Help Section</h2>
            <section>
               <div>
                  <img src="/images/illustration-image1.png" alt="" aria-hidden="true" />
               </div>
               <div>
                 <h3>Our Goal</h3>
                 <p>
                   ContactSphere is a highly functional, user friendly interactive contacts app, to help
                   you keep track of your contact. Being backed with a quality cloud service, your contacts are saved
                   for a long run and accessible from any where. Designed and engineered to serve your daily contact needs.
                   Your data is private and personalized for just you. 
                 </p>
               </div>
            </section>
            <HelpFaq />
         </main>
         <footer>
            <Tooltip title="Github Profile">
               <IconButton LinkComponent='a' href="https://github.com/nelsonleone/ContactSphere" aria-label="Github">
                  <BsGithub />
               </IconButton>
            </Tooltip>

            <Tooltip title="Email Us">
               <IconButton LinkComponent='a' href="https://mail.google.com/mail/?view=cm&to=onelsonuchechukwu@gmail.com" aria-label="Email">
                  <MdEmail />
               </IconButton>
            </Tooltip>

            <Tooltip title="Twitter Page">
               <IconButton LinkComponent='a' href="https://twitter.com/Nelson_f2e" aria-label="Twitter">
                  <BsTwitter />
               </IconButton>
            </Tooltip>

            <span>ContactSphere 2023 &copy;</span>
         </footer>
      </PageWrapper>
   )
}