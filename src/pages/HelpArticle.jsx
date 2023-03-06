export default function HelpArticle(){
   return(
      <article className="help-article main-content">
         <h2>ContactSphere Help Section</h2>
         <p>NOTE: Update Coming soon...enhanced user experienced with SSR</p>
         <p>Am happy you are having a wonderful and awesome user experince using our app</p>
         <p>Or is there any issue <img src="/images/sad-emoji.png" />?</p>

         <div className="mail-prompt">
            <p>
               To Avoid redirecting you, you can copy and paste our email address to leave your feedback.
               <span>We will reply swiftly.</span>
            </p>
            <p>We apologize for any problem you might have come across.</p>
            <span className="email-address"><span>EMAIL:</span> onelsonuchechukwu@gmail.com</span>
         </div>

         <div className="article-footer">
            <p>ContactSphere Services 2023</p>
         </div>
      </article>
   )
}