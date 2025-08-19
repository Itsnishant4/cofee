import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("products"); // products, orders, messages
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
                },
            };

            if (activeTab === "products") {
                const { data } = await axios.get("/api/products", config);
                setProducts(data);
            } else if (activeTab === "orders") {
                const { data } = await axios.get("/api/orders", config);
                setOrders(data);
            } else if (activeTab === "messages") {
                const { data } = await axios.get("/api/messages", config);
                setMessages(data);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            toast.error(err.response?.data?.message || "Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (newProductData) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };
            const { data } = await axios.post("/api/products", newProductData, config);
            setProducts([...products, data]);
            toast.success("Product added successfully!");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add product");
        }
    };

    const handleEditProduct = async (id, updatedProductData) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };
            const { data } = await axios.put(`/api/products/${id}`, updatedProductData, config);
            setProducts(products.map((p) => (p._id === id ? data : p)));
            toast.success("Product updated successfully!");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update product");
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                };
                await axios.delete(`/api/products/${id}`, config);
                setProducts(products.filter((p) => p._id !== id));
                toast.success("Product deleted successfully!");
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to delete product");
            }
        }
    };

    const handleUpdateOrderStatus = async (id, newStatus) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };
            const { data } = await axios.put(`/api/orders/${id}`, { status: newStatus }, config);
            setOrders(orders.map((o) => (o._id === id ? data : o)));
            toast.success("Order status updated successfully!");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update order status");
        }
    };

    const handleDeleteMessage = async (id) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                };
                await axios.delete(`/api/messages/${id}`, config);
                setMessages(messages.filter((m) => m._id !== id));
                toast.success("Message deleted successfully!");
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to delete message");
            }
        }
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

            <div className="flex justify-center mb-8">
                <button
                    onClick={() => setActiveTab("products")}
                    className={`py-2 px-4 rounded-l-lg ${activeTab === "products"
                            ? "bg-amber-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        }`}
                >
                    Manage Products
                </button>
                <button
                    onClick={() => setActiveTab("orders")}
                    className={`py-2 px-4 ${activeTab === "orders"
                            ? "bg-amber-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        }`}
                >
                    View Orders
                </button>
                <button
                    onClick={() => setActiveTab("messages")}
                    className={`py-2 px-4 rounded-r-lg ${activeTab === "messages"
                            ? "bg-amber-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        }`}
                >
                    View Messages
                </button>
            </div>

            {activeTab === "products" && (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Product Management</h2>
                    <button
                        onClick={() => handleAddProduct({ name: "New Coffee", description: "Delicious", price: 3.5, category: "Espresso", image: "/images/new-coffee.jpg" })} // Placeholder data
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full mb-4"
                    >
                        Add New Product
                    </button>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-gray-800">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-left">Image</th>
                                    <th className="py-2 px-4 border-b text-left">Name</th>
                                    <th className="py-2 px-4 border-b text-left">Category</th>
                                    <th className="py-2 px-4 border-b text-left">Price</th>
                                    <th className="py-2 px-4 border-b text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="py-2 px-4 border-b">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b">{product.name}</td>
                                        <td className="py-2 px-4 border-b">{product.category}</td>
                                        <td className="py-2 px-4 border-b">
                                            ${product.price.toFixed(2)}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                onClick={() => handleEditProduct(product._id, { name: "Updated Coffee", price: 4.0 })} // Placeholder data
                                                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-full mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-full"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "orders" && (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Order List</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-gray-800">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-left">Order ID</th>
                                    <th className="py-2 px-4 border-b text-left">User</th>
                                    <th className="py-2 px-4 border-b text-left">Items</th>
                                    <th className="py-2 px-4 border-b text-left">Total</th>
                                    <th className="py-2 px-4 border-b text-left">Status</th>
                                    <th className="py-2 px-4 border-b text-left">Date</th>
                                    <th className="py-2 px-4 border-b text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="py-2 px-4 border-b">{order._id}</td>
                                        <td className="py-2 px-4 border-b">{order.user ? order.user.name : "N/A"}</td>
                                        <td className="py-2 px-4 border-b">
                                            {order.orderItems.map((item) => (
                                                <p key={item.product}>
                                                    {item.name} (x{item.quantity})
                                                </p>
                                            ))}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            ${order.totalPrice.toFixed(2)}
                                        </td>
                                        <td className="py-2 px-4 border-b">{order.status}</td>
                                        <td className="py-2 px-4 border-b">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <select
                                                value={order.status}
                                                onChange={(e) =>
                                                    handleUpdateOrderStatus(order._id, e.target.value)
                                                }
                                                className="p-1 border rounded-md dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Canceled">Canceled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "messages" && (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-gray-800">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-left">Name</th>
                                    <th className="py-2 px-4 border-b text-left">Email</th>
                                    <th className="py-2 px-4 border-b text-left">Message</th>
                                    <th className="py-2 px-4 border-b text-left">Date</th>
                                    <th className="py-2 px-4 border-b text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((message) => (
                                    <tr key={message._id}>
                                        <td className="py-2 px-4 border-b">{message.name}</td>
                                        <td className="py-2 px-4 border-b">{message.email}</td>
                                        <td className="py-2 px-4 border-b">{message.message}</td>
                                        <td className="py-2 px-4 border-b">
                                            {new Date(message.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                onClick={() => handleDeleteMessage(message._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-full"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
