import { MemoizedHelp as Faq } from "../components/UserUtils";

export default function HelpPage(){
   return(
      <main className="page help-page">
        <h2>Help Section</h2>
        <Faq />
      </main>
   )
}