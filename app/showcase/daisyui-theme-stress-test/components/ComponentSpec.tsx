import React from 'react';

const ComponentSpec: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-3xl font-bold text-center mb-4">UI Component Spec</div>

      {/* Buttons */}
      <section className="p-6 rounded-box bg-base-100 border border-base-300 shadow-sm">
        <h3 className="text-lg font-bold mb-4 border-b border-base-200 pb-2">Buttons</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="btn">Default</button>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
          <button className="btn btn-info">Info</button>
          <button className="btn btn-success">Success</button>
          <button className="btn btn-warning">Warning</button>
          <button className="btn btn-error">Error</button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-outline btn-primary">Outline</button>
          <button className="btn btn-ghost">Ghost</button>
          <button className="btn btn-link">Link</button>
          <button className="btn btn-active btn-primary">Active</button>
          <button className="btn btn-disabled" tabIndex={-1} role="button" aria-disabled="true">Disabled</button>
          <button className="btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button className="btn btn-circle btn-secondary">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
          <button className="btn btn-primary loading">Loading</button>
        </div>
      </section>

      {/* Inputs & Toggles */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-box bg-base-100 border border-base-300 shadow-sm">
          <h3 className="text-lg font-bold mb-4 border-b border-base-200 pb-2">Form Inputs</h3>
          <div className="form-control w-full max-w-xs mb-2">
            <label className="label">
              <span className="label-text">What is your name?</span>
              <span className="label-text-alt">Top Right</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <label className="label">
              <span className="label-text-alt">Bottom Left</span>
            </label>
          </div>
          
          <div className="form-control w-full max-w-xs mb-2">
             <input type="text" placeholder="Primary input" className="input input-bordered input-primary w-full max-w-xs" />
          </div>
          
          <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="">
            <option value="" disabled>Pick your favorite movie</option>
            <option>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
          </select>

           <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Remember me</span> 
              <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
            </label>
          </div>
        </div>

        <div className="p-6 rounded-box bg-base-100 border border-base-300 shadow-sm">
           <h3 className="text-lg font-bold mb-4 border-b border-base-200 pb-2">Toggles & Sliders</h3>
           
           <div className="flex flex-col gap-4">
             <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Toggle Primary</span> 
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </label>
            </div>
            
             <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Toggle Secondary</span> 
                <input type="checkbox" className="toggle toggle-secondary" defaultChecked />
              </label>
            </div>

            <div className="w-full">
               <label className="label"><span className="label-text">Range Slider</span></label>
               <input type="range" min="0" max="100" defaultValue="40" className="range range-primary" />
            </div>

            <div className="w-full">
               <label className="label"><span className="label-text">Steps</span></label>
               <input type="range" min="0" max="100" defaultValue="25" className="range range-secondary" step="25" />
               <div className="w-full flex justify-between text-xs px-2">
                 <span>|</span><span>|</span><span>|</span><span>|</span><span>|</span>
               </div>
            </div>
             
             <div className="flex gap-4 mt-2">
                <div className="badge badge-primary">Primary</div>
                <div className="badge badge-secondary">Secondary</div>
                <div className="badge badge-accent">Accent</div>
                <div className="badge badge-outline">Outline</div>
             </div>
           </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="p-6 rounded-box bg-base-100 border border-base-300 shadow-sm">
         <h3 className="text-lg font-bold mb-4 border-b border-base-200 pb-2">Alerts</h3>
         <div className="flex flex-col gap-2">
            <div role="alert" className="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>New software update available.</span>
            </div>

            <div role="alert" className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Your purchase has been confirmed!</span>
            </div>

            <div role="alert" className="alert alert-warning">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>Warning: Invalid email address!</span>
            </div>

            <div role="alert" className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Error! Task failed successfully.</span>
            </div>
         </div>
      </section>
      
      {/* Stats */}
      <section className="stats shadow w-full overflow-x-auto">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div className="stat-title">Page Views</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        
        <div className="stat">
          <div className="stat-value">86%</div>
          <div className="stat-title">Tasks done</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </section>
    </div>
  );
};

export default ComponentSpec;
