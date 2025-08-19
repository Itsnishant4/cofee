import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );
    const tax = subtotal * 0.08; // Example tax rate
    const total = subtotal + tax;

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
        toast.success("Item removed from cart!");
    };

    const handleQtyChange = (item, qty) => {
        dispatch(addToCart({ ...item, qty: Number(qty) }));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-300">
                    Your cart is empty.{" "}
                    <Link to="/menu" className="text-amber-600 hover:underline">
                        Go to Menu
                    </Link>
                </p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mb-4"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-md mr-4"
                                />
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold">{item.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        ${item.price.toFixed(2)}
                                    </p>
                                    <div className="flex items-center mt-2">
                                        <label htmlFor={`qty-${item._id}`} className="mr-2">Qty:</label>
                                        <input
                                            type="number"
                                            id={`qty-${item._id}`}
                                            value={item.qty}
                                            onChange={(e) => handleQtyChange(item, e.target.value)}
                                            min="1"
                                            className="w-16 p-1 border rounded-md text-black"
                                        />
                                    </div>
                                </div>
                                <p className="text-lg font-semibold">
                                    ${(item.price * item.qty).toFixed(2)}
                                </p>
                                <button
                                    onClick={() => handleRemoveFromCart(item._id)}
                                    className="ml-4 text-red-600 hover:text-red-800"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <p>Subtotal:</p>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between mb-2">
                            <p>Tax (8%):</p>
                            <p>${tax.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between font-bold text-xl mb-6">
                            <p>Total:</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <Link
                            to="/checkout"
                            className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full text-center transition duration-300"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
