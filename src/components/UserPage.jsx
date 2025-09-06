import React from 'react';

const ChatPromoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-black p-6">
      {/* Giant CSS Chat Logo */}
      <div className="relative w-40 h-40 mb-10">
        {/* Chat Bubble */}
        <div className="w-40 h-40 bg-white rounded-full relative">
          <div className="absolute bottom-0 left-1/4 w-0 h-0 border-t-[30px] border-t-white border-x-[20px] border-x-transparent"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600 text-6xl font-bold">
          <img src="/logo.png" alt="" />
        </div>
      </div>

      {/* Tagline / Promotion */}
      <h1 className="text-6xl font-extrabold mb-4 text-center drop-shadow-lg">
        FlowChat
      </h1>
      <p className="text-xl text-center max-w-xl mb-8 drop-shadow-md">
        Experience seamless messaging with your friends and colleagues. Stay connected, anytime, anywhere.
      </p>

      {/* CTA Buttons */}
      <div className="flex space-x-4">
        <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition transform">
          Start Chat
        </button>
        <button className="bg-indigo-700 bg-opacity-70 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition transform">
          make Friends
        </button>
      </div>
    </div>
  );
};

export default ChatPromoPage;
