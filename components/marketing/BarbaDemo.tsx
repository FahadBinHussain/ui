"use client";

import { useState } from "react";

export default function BarbaDemo() {
  const [currentPage, setCurrentPage] = useState("home");

  const pages = {
    home: {
      title: "Home",
      bg: "from-blue-500 to-purple-600",
      content: "Welcome to the home page! Barba.js creates smooth page transitions.",
    },
    about: {
      title: "About",
      bg: "from-green-500 to-teal-600",
      content: "This is the about page. Notice the smooth fade transition between pages.",
    },
    contact: {
      title: "Contact",
      bg: "from-pink-500 to-rose-600",
      content: "Get in touch! The page transitions feel fluid and seamless.",
    },
    services: {
      title: "Services",
      bg: "from-orange-500 to-red-600",
      content: "Our services page showcasing smooth animations powered by Barba.js.",
    },
  };

  const currentPageData = pages[currentPage as keyof typeof pages];

  return (
    <div className="min-h-[600px] p-8">
      {/* Navigation */}
      <nav className="flex justify-center gap-4 mb-8">
        {Object.keys(pages).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              currentPage === page
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </nav>

      {/* Page Content with Fade Animation */}
      <div
        key={currentPage}
        className={`relative bg-gradient-to-br ${currentPageData.bg} rounded-2xl p-12 text-white shadow-2xl animate-fadeIn`}
      >
        <h1 className="text-5xl font-bold mb-6">{currentPageData.title}</h1>
        <p className="text-xl opacity-90">{currentPageData.content}</p>
        
        <div className="mt-8 flex gap-4">
          <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
            <p className="text-sm opacity-75">Smooth Transitions</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
            <p className="text-sm opacity-75">SPA Experience</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
            <p className="text-sm opacity-75">No Page Reload</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
