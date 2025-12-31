import React from 'react';

const FeatureGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      {/* Card 1 */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-accent">Responsive Design</h2>
          <p>This layout adapts fluidly to mobile, tablet, and desktop viewports using standard Tailwind breakpoints.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-accent btn-sm">Details</button>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card bg-neutral text-neutral-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Dark Mode Ready</h2>
          <p>By using the `neutral` utility, this card demonstrates high-contrast blocks typical in dark interfaces.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm">Action</button>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="card bg-base-100 shadow-xl image-full">
        <figure>
          <img src="https://picsum.photos/400/200" alt="Placeholder" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Image Overlay</h2>
          <p>DaisyUI&apos;s `image-full` variant automatically handles text contrast over images.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-glass btn-sm">Glass</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;
