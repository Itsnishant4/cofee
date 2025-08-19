import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../redux/slices/messageSlice";
import toast from "react-hot-toast";

const Contact = () => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.message);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        if (success) {
            toast.success("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" }); // Clear form
        }
        if (error) {
            toast.error(error);
        }
    }, [success, error]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createMessage(formData));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                                Name
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
                            <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>

                {/* Location Map */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Our Location</h2>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2100000000004!2d144.9631!3d-37.814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x504567846297500!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                        123 Coffee Lane, Melbourne VIC, Australia
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">Phone: +61 123 456 789</p>
                    <p className="text-gray-700 dark:text-gray-300">Email: info@coffeeshop.com</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
