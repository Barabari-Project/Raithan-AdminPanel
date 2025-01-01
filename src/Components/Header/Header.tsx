import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/raitanlogo.png";


const Header: React.FC = () => {
  const [hamburgerOpen, setHamburgerOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickLogout = () => {
    Cookies.remove('token');
    navigate('/login', { replace: true });
  };

  return (
    <header className="shadow mb-2 flex flex-col transition-all duration-900">
      <div className="flex justify-between items-center p-4 min-w-[157px]">
        <a
          href="#"
          className="flex items-center whitespace-nowrap text-[27px] font-black"
        >
          <span className=" text-blue-600">
            <img src={logo} className="h-11 min-w-fit" alt="logo Image" />
          </span>
          <span className="text-black">Raithan</span>
        </a>
        <div className="hidden md:flex items-center justify-between gap-10">
          <div className="hover:text-blue-600 hover:cursor-pointer hover:scale-110 font-semibold transition-all duration-500">
            Service Provider
          </div>
          <div className="hover:text-blue-600 hover:cursor-pointer hover:scale-110 font-semibold transition-all duration-500">
            Service Seeker
          </div>
          <button onClick={handleClickLogout} className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Logout
          </button>
        </div>
        {/* hamburger */}
        <div className="md:hidden flex">
          <label>
            <div className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
              <input onChange={() => setHamburgerOpen(!hamburgerOpen)} checked={hamburgerOpen} className="hidden peer" type="checkbox" />
              <div className="w-[60%] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"></div>
              <div className="w-[60%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center peer-checked:hidden"></div>
              <div className="w-[60%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"></div>
            </div>
          </label>
        </div>
      </div>
      {hamburgerOpen && <div className="flex flex-col items-center justify-center gap-4 p-4 bg-white  w-screen max-w-screen">
        <div className="hover:text-blue-600 hover:cursor-pointer hover:scale-110 font-semibold transition-all duration-500">
          Service Provider
        </div>
        <div className="hover:text-blue-600 hover:cursor-pointer hover:scale-110 font-semibold transition-all duration-500">
          Service Seeker
        </div>
        <button onClick={handleClickLogout} className="bg-blue-600 text-white px-4 py-1 rounded-md">
          Logout
        </button>
      </div>}
    </header>
  );
};

export default Header;
