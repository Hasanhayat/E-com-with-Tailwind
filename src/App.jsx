import { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import hero from "./assets/hero-img.png";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-theme min-h-screen font-sans">
      <div className="top w-screen h-8 bg-white items-center flex justify-around">
        <div className="left text-gray-800 ">
          <ul className="list-none flex items-center flex gap-2 text-xs cursor-pointer hover:underline font-light">
            <li>ENGLISH</li>
            <li>USD</li>
          </ul>
        </div>
        <div className="right text-gray-800">
          <ul className="list-none flex items-center flex gap-4 text-xs cursor-pointer hover:underline font-light">
            <li>My Account</li>
            <li>wishlish</li>
            <li>checkout</li>
            <li>login</li>
          </ul>
        </div>
      </div>
      <nav className="w-screen min-h-16 bg-gray-800 flex justify-around items-center sticky top-0 ">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="navlinks hidden md:block">
          {" "}
          <ul className="text-sm list-none flex items-center gap-x-7 text-xs text-white font-light">
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
      <section className="hero max-h-[calc(100vh-64px)] flex items-center justify-around bg-theme overflow-hidden px-themePadding">
         <div className="contant flex flex-col ">
          <h4>New Arrivals</h4>
          <h1>New Style For Lamps</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut provident ut cupiditate, distinctio repudiandae, ab architecto facere porro quo delectus neque accusamus, enim nesciunt impedit quas assumenda! Architecto, dolores? Exercitationem?</p>
          <button>Shop Now</button>
         </div>

        <img src={hero} alt=""  className=""/>

      </section>
    </div>
  );
}

export default App;
