import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

const Menu = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);
    const { cartItems } = useSelector((state) => state.cart);

    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const categories = [
        "All",
        "Espresso",
        "Cappuccino",
        "Latte",
        "Cold Brew",
        "Snacks",
    ];

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, qty: 1 }));
        toast.success(`${product.name} added to cart!`);
    };

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter((product) => product.category === selectedCategory);

    if (loading) {
        return <div className="text-center py-8">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                <div className="flex flex-wrap gap-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`py-2 px-4 rounded-full ${selectedCategory === category
                                    ? "bg-amber-700 text-white"
                                    : "bg-amber-600 hover:bg-amber-700 text-white"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                                        {product.description}
                                    </p>
                                    <p className="text-lg font-semibold text-amber-600 mb-4">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No products found in this category.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
