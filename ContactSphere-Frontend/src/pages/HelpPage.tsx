import PageWrapper from "../components/PageWrapper";
import { HelpFaq } from "../components/UserUtils";

export default function HelpPage(){
   return(
      <PageWrapper className="help_page" title="Help & About" >
         <main className="page help-page">
         <h2>Help Section</h2>
         <HelpFaq />
         </main>
      </PageWrapper>
   )
}