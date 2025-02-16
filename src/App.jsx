import { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-500 h-screen font-sans">
      <div className="top w-screen h-8 bg-white items-center flex justify-around">
        <div className="left text-gray-800 ">
          <ul className="list-none flex items-center flex gap-2 text-[12px] cursor-pointer hover:underline font-light">
            <li>ENGLISH</li>
            <li>USD</li>
          </ul>
        </div>
        <div className="right text-gray-800">
          <ul className="list-none flex items-center flex gap-4 text-[12px] cursor-pointer hover:underline font-light">
            <li>My Account</li>
            <li>wishlish</li>
            <li>checkout</li>
            <li>login</li>
          </ul>
        </div>
      </div>
      <nav className="w-screen min-h-16 bg-gray-800 flex justify-around items-center">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="navlinks">
          {" "}
          <ul className="text-sm list-none flex items-center gap-x-7 text-2 text-white font-light">
            <li className="hover:text-blue-300 transition-all duration-700 cursor-pointer">
              HOME
            </li>
            <li className="hover:text-blue-300 transition-all duration-700 cursor-pointer">
              PRODUCTS
            </li>
            <li className="hover:text-blue-300 transition-all duration-700 cursor-pointer">
              {" "}
              COLLECTION
            </li>
            <li className="hover:text-blue-300 transition-all duration-700 cursor-pointer">
              PAGES
            </li>
            <li className="hover:text-blue-300 transition-all duration-700 cursor-pointer">
              ABOUT US
            </li>
            <li className="hover:text-blue-300 transition-all duration-700 cursor-pointer">
              CONTACT US
            </li>
            <li className="hover:text-blue-300 transition-all duration-700 cursor-pointer"></li>
            <li className="hover:text-blue-300 transition-all duration-700 cursor-pointer"></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default App;
