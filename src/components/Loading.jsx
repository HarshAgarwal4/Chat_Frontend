import React from 'react'

const LoadingPage = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      
      {/* Loading text */}
      <p className="mt-4 text-gray-700 text-lg font-medium">{message}</p>
    </div>
  );
};

export default LoadingPage;
