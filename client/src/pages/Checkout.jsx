import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const { loading, success, error } = useSelector((state) => state.order);

    const [formData, setFormData] = useState({
        name: user ? user.name : "",
        email: user ? user.email : "",
        address: "",
        city: "",
        zip: "",
        paymentMethod: "creditCard",
    });

    useEffect(() => {
        if (success) {
            toast.success("Order placed successfully!");
            dispatch(clearCart());
            navigate("/myorders"); // Redirect to user's orders page
        }
        if (error) {
            toast.error(error);
        }
    }, [success, error, navigate, dispatch]);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            toast.error("Your cart is empty. Please add items to proceed.");
            return;
        }

        dispatch(
            createOrder({
                orderItems: cartItems,
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    zip: formData.zip,
                },
                paymentMethod: formData.paymentMethod,
                itemsPrice: subtotal,
                taxPrice: tax,
                totalPrice: total,
            })
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-300">
                    Your cart is empty.{" "}
                    <Link to="/menu" className="text-amber-600 hover:underline">
                        Go to Menu
                    </Link>
                </p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex justify-between mb-2">
                                <p>
                                    {item.name} x {item.qty}
                                </p>
                                <p>${(item.price * item.qty).toFixed(2)}</p>
                            </div>
                        ))}
                        <hr className="my-4" />
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
                    </div>

                    {/* Shipping and Payment Form */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-gray-700 dark:text-gray-300 mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="city" className="block text-gray-700 dark:text-gray-300 mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="zip" className="block text-gray-700 dark:text-gray-300 mb-2">
                                        Zip Code
                                    </label>
                                    <input
                                        type="text"
                                        id="zip"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
                            <div className="mb-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="creditCard"
                                        checked={formData.paymentMethod === "creditCard"}
                                        onChange={handleChange}
                                        className="form-radio text-amber-600"
                                    />
                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Credit Card</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={formData.paymentMethod === "paypal"}
                                        onChange={handleChange}
                                        className="form-radio text-amber-600"
                                    />
                                    <span className="ml-2 text-gray-700 dark:text-gray-300">PayPal</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                                disabled={loading}
                            >
                                {loading ? "Placing Order..." : "Place Order"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
