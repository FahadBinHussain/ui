import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="hero min-h-[50vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-primary">Hello there</h1>
          <p className="py-6 text-base-content">
            This is the ultimate <span className="text-secondary font-bold">DaisyUI</span> theme stress test. 
            Toggle through the dropdown above to see how semantic colors, border radii, and component styles 
            adapt instantly.
          </p>
          <div className="flex gap-2 justify-center">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-outline btn-secondary">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
