import React from 'react';

export const RocketCard = () => (
  <div className="flex flex-col flex-1 mt-8 md:mt-0 md:ml-24 rounded-[12px] bg-[#EDF6FF] bg-no-repeat border-2 border-[#2789E5] border-opacity-25 w-full md:w-auto">
    <img src="/assets/rocketcard-bg.svg" />
    <div className="m-12">
      <div>
        <div className="text-neutral-800 text-center">
          Brainstrom new descriptions or generate FAQs directly from the app.
        </div>
      </div>
      <div className="flex flex-col justify-center mt-12">
        <a
          href="/products"
          className="text-2xl text-center text-white rounded-xl bg-[#2789E5] hover:pointer py-3 w-full"
        >
          View All Products
        </a>
      </div>
    </div>
  </div>
);
