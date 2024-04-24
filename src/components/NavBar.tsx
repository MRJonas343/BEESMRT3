import { useState } from "react"

//* Components
import { Link } from "react-router-dom"

//* Assets
import logoWhite from '@assets/logo_white-_2_.webp'



const NavBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const btnClassName = isExpanded ? 'bg-close-menu w-5 h-5 bg-cover bg-center cursor-pointer transition-all z-50 md:hidden' : ' w-5 h-5 bg-cover bg-center cursor-pointer transition-all z-50 md:hidden bg-open-menu'

  const handlerClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <nav className="w-[95%] px-6 mx-auto overflow-hidden h-9 mt-3 flex items-center justify-between font-Principal text-3xl text-3d text-white xl:w-screen xl:px-12">
      <Link to='/' className="w-1/3 max-w-[240px] hover:scale-110 ease-in-out duration-200">
        <img alt="logo" src={logoWhite} className="w-40"></img>
      </Link>

      <label htmlFor="btn-open-menu" className={btnClassName} onClick={handlerClick}>

      </label>

      <input id="btn-open-menu" type="checkbox" className="peer hidden" />

      <div className="fixed top-0 left-0 w-screen h-screen bg-gray-400/60 md:bg-transparent flex justify-center items-center inset-0 translate-x-full peer-checked:translate-x-0 transition-transform md:static  md:translate-x-0 z-40">
        <div className="lg:mr-28">
          <ul className="tracking-wide backdrop-blur-lg bg-white/80 outline outline-Pink1 outline-4 md:outline-none absolute inset-x-0 top-24 p-12 w-[90%] mx-auto rounded-lg h-max text-center grid gap-10 md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:static">
            <li className="hover:scale-110 ease-in-out duration-200 hover:text-purple-500">
              <Link to='/LogIn'>Log In</Link>
            </li>
            <li className="hover:scale-110 ease-in-out duration-200 hover:text-purple-500">
              <Link to='/Contact'>Contact Us</Link>
            </li>
            <li className="hover:scale-110 ease-in-out duration-200 hover:text-purple-500">
              <Link to='/About'>About Us</Link>
            </li>
            <li className="hover:scale-110 ease-in-out duration-200 hover:text-purple-500 lg:hidden">
              <Link to='/MyAccount'>My account</Link>
            </li>
          </ul>
        </div>
      </div>

      <Link to="/MyAccount" className="hidden lg:block hover:scale-110 ease-in-out duration-200 hover:text-purple-500">
        <button className="hidden lg:block w-max text-3d">My account</button>
      </Link>

    </nav>
  )
}

export default NavBar