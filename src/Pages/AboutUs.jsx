import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center px-6 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4">
          Welcome to Book Haven
        </h1>
        <p className="text-gray-700 text-lg md:text-xl">
          Your ultimate sanctuary for discovering, exploring, and celebrating
          the world of books. From timeless classics to modern bestsellers, Book
          Haven connects readers with the stories they’ll love.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="max-w-4xl grid md:grid-cols-2 gap-12 items-center mb-16">
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
          alt="Bookshelf"
          className="rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-semibold text-indigo-600 mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 mb-4">
            Book Haven started as a small passion project by avid readers who
            wanted to create a cozy corner for book lovers everywhere. Over the
            years, we’ve grown into a community where stories come alive and
            ideas flourish.
          </p>
          <p className="text-gray-700">
            We believe every book has a journey, and we’re here to guide you
            through it—whether you’re hunting for a hidden gem, diving into a
            new release, or revisiting a classic.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-indigo-50 w-full py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-indigo-600 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg md:text-xl">
            To create a haven for readers where knowledge, imagination, and
            creativity thrive. We’re committed to making books accessible and
            inspiring everyone to discover the joy of reading.
          </p>
        </div>
      </div>

   
      <div className="mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Join Our Community
        </h2>
        <p className="text-gray-700 mb-6">
          Be part of a growing community of book lovers and stay updated with
          our latest collections and recommendations.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
