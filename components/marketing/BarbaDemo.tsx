"use client";

import { useState } from "react";

export default function BarbaDemo() {
  const [currentPage, setCurrentPage] = useState("home");
  const [transitionType, setTransitionType] = useState<string>("default");

  const pages = {
    home: {
      title: "Home",
      bg: "from-blue-500 to-purple-600",
      content: "Welcome to the home page! Barba.js creates smooth page transitions.",
      namespace: "home",
    },
    about: {
      title: "About",
      bg: "from-green-500 to-teal-600",
      content: "This is the about page. Navigate to Contact for a SLIDE transition!",
      namespace: "about",
    },
    contact: {
      title: "Contact",
      bg: "from-pink-500 to-rose-600",
      content: "Get in touch! Different pages use different transition effects.",
      namespace: "contact",
    },
    services: {
      title: "Services",
      bg: "from-orange-500 to-red-600",
      content: "Our services page uses a SCALE transition when leaving!",
      namespace: "services",
    },
  };

  const currentPageData = pages[currentPage as keyof typeof pages];

  const handlePageChange = (page: string) => {
    // Determine transition type based on navigation
    if (currentPage === "about" && page === "contact") {
      setTransitionType("slide");
    } else if (currentPage === "services") {
      setTransitionType("scale");
    } else {
      setTransitionType("fade");
    }
    setCurrentPage(page);
  };

  return (
    <div className="min-h-[700px] p-8">
      {/* Transition Type Indicator */}
      <div className="text-center mb-4">
        <span className="inline-block px-4 py-2 bg-gray-900 text-white text-sm rounded-full font-medium">
          Current Transition: <span className="text-blue-400 uppercase">{transitionType}</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex justify-center gap-4 mb-8 flex-wrap">
        {Object.keys(pages).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              currentPage === page
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            data-barba-namespace={pages[page as keyof typeof pages].namespace}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </nav>

      {/* Page Content with Dynamic Animation */}
      <div
        key={currentPage}
        className={`relative bg-gradient-to-br ${currentPageData.bg} rounded-2xl p-12 text-white shadow-2xl ${
          transitionType === "fade" ? "animate-fadeIn" :
          transitionType === "slide" ? "animate-slideIn" :
          "animate-scaleIn"
        }`}
        data-barba-namespace={currentPageData.namespace}
      >
        <h1 className="text-5xl font-bold mb-6">{currentPageData.title}</h1>
        <p className="text-xl opacity-90">{currentPageData.content}</p>
        
        <div className="mt-8 flex gap-4 flex-wrap">
          <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
            <p className="text-sm opacity-75">Namespace: {currentPageData.namespace}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
            <p className="text-sm opacity-75">Transition: {transitionType}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
            <p className="text-sm opacity-75">No Page Reload</p>
          </div>
        </div>

        {/* Advanced Features Info */}
        <div className="mt-8 bg-black/20 backdrop-blur-md rounded-lg p-6">
          <h3 className="text-lg font-bold mb-3">Advanced Features Active:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Multiple transition types (fade, slide, scale)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Page-specific namespaces and views</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Global hooks (before, after, enter)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Auto-scroll to top on navigation</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Prevent running (blocks clicks during transitions)</span>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

