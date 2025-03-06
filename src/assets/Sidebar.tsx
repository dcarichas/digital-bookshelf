import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openNav = () => setIsOpen(true);
    const closeNav = () => setIsOpen(false);

    return (
        <div>
            <div
                id="mySidebar"
                className="sidebar"
                style={{ width: isOpen ? "250px" : "0" }}
            >
                <button className="closebtn" onClick={closeNav}>
                    &times;
                </button>
                <Link to="/biblioteca" onClick={closeNav}>Biblioteca</Link>
                <Link to="/adicionar" onClick={closeNav}>Adicionar</Link>
                <Link to="/sobre" onClick={closeNav}>Sobre</Link>
            </div>

            {!isOpen && (
                <button className="openbtn" onClick={openNav}>
                    &#9776;
                </button>
            )}
        </div>
    );
};

export default Sidebar;
