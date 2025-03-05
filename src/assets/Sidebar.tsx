import React, {useState} from "react";

// Source: https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openNav = () => setIsOpen(true);
    const closeNav = () => setIsOpen(false);

    return (
        <div>
            {/* Sidebar */}
            <div
                id="mySidebar"
                className="sidebar"
                style={{ width: isOpen ? "250px" : "0" }}
            >
                <button className="closebtn" onClick={closeNav}>
                    &times;
                </button>
                <a href="#">Biblioteca</a>
                <a href="#">Adicionar</a>
                <a href="#">Sobre</a>
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