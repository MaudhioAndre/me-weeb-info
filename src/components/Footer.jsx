import React from "react";

// import "../assets/style/footer.scss"

export default function Footer() {
  return (
    <footer className="bg-transparent">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-0">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start">
            <h1
              to="/"
              className="block text-2xl text-center text-white md:text-left"
            >
              <span className="sr-only">Home</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                M
              </span>
              e
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                W
              </span>
              eeb
            </h1>
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="mt-12 text-sm text-center lg:text-right">
              Maudhio Andre Wijaya 2024. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
