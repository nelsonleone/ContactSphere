import { AiOutlineYoutube } from "react-icons/ai"
import { FaFacebookSquare, FaInstagram, FaSnapchat } from "react-icons/fa"
import { FiTwitter } from "react-icons/fi"
import { Sites } from '../../src/vite-env'
import * as React from 'react'
import { BsChatHeartFill } from "react-icons/bs"


export default function SocialIconLink({ site }: { site:Sites }){
   
   return(
      site === "facebook" ?
         <>
            <FaFacebookSquare aria-describedby="contact-social-handle-facebook-icon" />
            <span className="AT_only" id="contact-social-handle-facebook-icon">View Contact Facebook Page</span>
         </>
      :
      site === "snapchat" ?
         <>
            <FaSnapchat  aria-describedby="contact-social-handle-snapchat-icon" />
            <span className="AT_only" id="contact-social-handle-snapchat-icon">View Contact Snapchat Page</span>
         </>
      :
      site === "instagram" ?
         <>
            <FaInstagram  aria-describedby="contact-social-handle-instagram-icon" />
            <span className="AT_only" id="contact-social-handle-instagram-icon">View Contact Instagram Page</span>
         </>
      :
      site === "youtube" ?
         <>
            <AiOutlineYoutube aria-describedby="contact-social-handle-youtube-icon" />
            <span className="AT_only" id="contact-social-handle-youtube-icon">View Contact Youtube Page</span>
         </>
      :
      site === "twitter" ?
         <>
            <FiTwitter aria-describedby="contact-social-handle-twitter-icon" />
            <span className="AT_only" id="contact-social-handle-twitter-icon">View Contact Twitter Page</span>
         </>
      :
      <>
         <BsChatHeartFill aria-describedby="contact-social-handle-disabled-icon" />
         <span className="AT_only" id="contact-social-handle-disabled-icon">No Social Site Handle </span>
      </>
   )
}