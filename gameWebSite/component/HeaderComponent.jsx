import React, { useState } from "react";
import "./stylee.css";

const HeaderComponent = () => {
 

  const handleLogin = () => {
    setLogin(!login);
    if (signUp) setSignUp(false);
  };

  const handleSignup = () => {
    setSignUp(!signUp);
    if (login) setLogin(false);
  };

  return (
    
      <header className="headerStyle">
        <nav>
          <div className="button-container">
            <button className="greenButton">Home</button>
            <button className="greenButton">Apps</button>
            <button className="greenButton">Contacts</button>
           
            
          </div>
        </nav>
      </header>
   
  );
};

export default HeaderComponent;
