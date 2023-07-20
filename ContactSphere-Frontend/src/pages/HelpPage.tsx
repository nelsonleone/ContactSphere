import PageWrapper from "../components/PageWrapper";
import { MemoizedHelp as Faq } from "../components/UserUtils";

export default function HelpPage(){
   return(
      <PageWrapper className="help_page" title="Help & About" >
         <main className="page help-page">
         <h2>Help Section</h2>
         <Faq />
         </main>
      </PageWrapper>
   )
}