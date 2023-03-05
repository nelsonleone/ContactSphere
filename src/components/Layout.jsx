import Header from "./Header"
import NavSection from "./NavSection"

export default function Layout(props){
   const  { openNav, setOpenNav } = props;
   return(
      <>
         <Header setOpenNav={setOpenNav}openNav={openNav} />
         <NavSection openNav={openNav} setOpenNav={setOpenNav}/>
      </>
   )
}