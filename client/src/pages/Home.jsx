import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-coffee.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
                <h1 className="text-5xl font-bold mb-4">Welcome to Coffee Shop</h1>
                <p className="text-xl mb-8">Your daily dose of happiness</p>
                <div className="space-x-4">
                    <Link to="/menu" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
                        View Menu
                    </Link>
                    <Link to="/cart" className="bg-white text-amber-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition duration-300">
                        Order Now
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Home;
