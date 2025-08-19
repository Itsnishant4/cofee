import React from "react";

const About = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                <div>
                    <img
                        src="/images/about-story.jpg"
                        alt="Our Story"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Founded in 2020, Coffee Shop started with a simple dream: to create
                        a cozy space where people could enjoy exceptional coffee and connect
                        with their community. What began as a small, passionate endeavor has
                        grown into a beloved local spot, known for its warm ambiance and
                        dedication to quality.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                <div>
                    <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Our mission is to serve the finest coffee, sourced ethically and
                        roasted to perfection. We believe in fostering a welcoming
                        environment where every cup tells a story, and every visit leaves
                        you feeling refreshed and inspired. We are committed to
                        sustainability, supporting local farmers, and giving back to the
                        community that has embraced us.
                    </p>
                </div>
                <div>
                    <img
                        src="/images/about-mission.jpg"
                        alt="Our Mission"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>

            <div className="text-center">
                <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mx-auto max-w-2xl">
                    <li className="mb-2">
                        <span className="font-bold">Quality:</span> We meticulously select
                        our beans and craft each drink with precision.
                    </li>
                    <li className="mb-2">
                        <span className="font-bold">Community:</span> We strive to be a
                        gathering place that strengthens local bonds.
                    </li>
                    <li className="mb-2">
                        <span className="font-bold">Sustainability:</span> We are dedicated
                        to environmentally friendly practices and ethical sourcing.
                    </li>
                    <li className="mb-2">
                        <span className="font-bold">Passion:</span> Our love for coffee
                        drives everything we do.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default About;
