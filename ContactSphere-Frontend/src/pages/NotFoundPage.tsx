import { useLocation, useNavigate } from "react-router-dom"
import { TbError404 } from 'react-icons/tb' 
import { useEffect } from "react"

export default function NotFoundPage() {

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/')
    }, 7000)

    return () => clearTimeout(redirectTimer)
  },[])

  return (
    <section className="not_found_page">
      <TbError404 />
      <h2>{location.pathname} Not Found</h2>
      <p>Check your URL, we will redirect you to the homepage shortly</p>
    </section>
  )
}
