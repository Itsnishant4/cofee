import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { FaSun, FaMoon, FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
                Coffee Shop
            </Link>
            <nav className="flex items-center space-x-4">
                <Link to="/menu" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    Menu
                </Link>
                <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    About
                </Link>
                <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    Contact
                </Link>
                <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>
                <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    <FaShoppingCart />
                </Link>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    <FaUser />
                </Link>
            </nav>
        </header>
    );
};

export default Header;
