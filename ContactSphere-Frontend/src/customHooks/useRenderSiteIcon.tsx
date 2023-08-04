import { FC, useCallback, useEffect, useState } from "react"
import { AiOutlineYoutube } from "react-icons/ai"
import { FaFacebookSquare, FaInstagram, FaSnapchat } from "react-icons/fa"
import { FiTwitter } from "react-icons/fi"
import { Sites } from "../vite-env"


export default function useRenderSiteIcon(site:Sites){
   const [IconComponent,setIconComponent] = useState<FC | null>(null)

   const handleSetIconComponent = useCallback(() => {
      switch(site){
         case "facebook": 
            return (
               <>
                  <FaFacebookSquare aria-describedby="contact-social-handle-facebook-icon" />
                  <span className="AT_only" id="contact-social-handle-facebook-icon">View Contact Facebook Page</span>
               </>
            )
         break;

         case "snapchat": 
            return (
               <>
                  <FaSnapchat  aria-describedby="contact-social-handle-snapchat-icon" />
                  <span className="AT_only" id="contact-social-handle-snapchat-icon">View Contact Snapchat Page</span>
               </>
            )
         break;

         case "instagram": 
            return (
               <>
                  <FaInstagram  aria-describedby="contact-social-handle-instagram-icon" />
                  <span className="AT_only" id="contact-social-handle-instagram-icon">View Contact Instagram Page</span>
               </>
            )
         break;

         case "youtube": 
            return (
               <>
                  <AiOutlineYoutube aria-describedby="contact-social-handle-youtube-icon" />
                  <span className="AT_only" id="contact-social-handle-youtube-icon">View Contact Youtube Page</span>
               </>
            )
         break;

         case "twitter": 
            return (
               <>
                  <FiTwitter aria-describedby="contact-social-handle-twitter-icon" />
                  <span className="AT_only" id="contact-social-handle-twitter-icon">View Contact Twitter Page</span>
               </>
            )
         break;

         default:
            return null
         ;
      }
   },[site])

   useEffect(() => {
      setIconComponent(handleSetIconComponent)
   },[handleSetIconComponent])

   return IconComponent;
}