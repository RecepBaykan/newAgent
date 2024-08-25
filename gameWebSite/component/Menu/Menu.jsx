import React from 'react';
import '../Menu/menu.css'
import { Link } from 'react-router-dom';

const Menu = () => {

    const menuItems = [
        { id: 1, name: 'News', image: 'Menu/left.png' },
        { id: 2, name: 'Patchs', image: 'Menu/left.png' },
        { id: 3, name: 'Events', image: 'Menu/left.png' },
        { id: 4, name: '', image: 'Menu/center.png', link:'/playAlphaTest'},
        { id: 5, name: 'Agents', image: 'Menu/right.png' },
        { id: 6, name: 'Mods', image: 'Menu/right.png' },
        { id: 7, name: 'Weapons', image: 'Menu/right.png' }, // Benzersiz ID
    ];

    return (
        <div className="menuContainer">
            {menuItems.map((item) => (
                <button key={item.id} className="imageButton">
                   
                    <div className="imageWrapper">
                    {item.id == 4 ? <Link to={item.link}><img 
                            className="menuItem" 
                            src={item.image} 
                            alt={item.name} 
                        /></Link> : <img 
                        className="menuItem" 
                        src={item.image} 
                        alt={item.name} 
                    />}
                        
                        {item.name && <span className="menuText">{item.name}</span>}
                    </div>
                </button>
            ))}
        </div>
    );
};

export default Menu;
