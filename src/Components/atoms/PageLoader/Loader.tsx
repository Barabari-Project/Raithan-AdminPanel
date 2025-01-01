import React from "react";
import "./Loader.css";
const Loader: React.FC = () => {
  return (
    <div className="z-10 h-screen w-screen max-h-screen max-w-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center text-white text-xl bg-white">
      <div id="page">
        <div id="container">
          <div id="ring"></div>
          <div id="ring"></div>
          <div id="ring"></div>
          <div id="ring"></div>
          <div id="h3">loading</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
