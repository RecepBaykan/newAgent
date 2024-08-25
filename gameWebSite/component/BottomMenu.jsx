import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../component/bottomMenu.css";
import { useParams } from "react-router-dom";
const BottomMenu = () => {

  const menuItems = [
    { id: 1, name: "News", href: "#News" },
    { id: 2, name: "Patchs", href: "#Patchs" },
    { id: 3, name: "Events", href: "#Events" },
    { id: 4, name: "PLAY TEST", href: "/playAlphaTest" },
    { id: 5, name: "Agents", href: "#Agents" },
    { id: 6, name: "Maps", href: "#Maps" },
    { id: 7, name: "Weapons", href: "#Weapons" },
  ];


  return (
    <div className="bottom-menu">
      {menuItems.map((item) => (
        <button
          className={`button ${item.href === activeHref ? 'active' : ''} ${item.id === 4 ? 'play' : ''}`}
          key={item.id}
        >
          <span className="span">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BottomMenu;
